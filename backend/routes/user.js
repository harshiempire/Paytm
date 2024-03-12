const zod = require("zod");
const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware");

const userRouter = express.Router();

//*************** SIGNUP ********************* */
const signupZod = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

/**
 * Route to handle user signup.
 * Validates the request body using Zod schema validation.
 * Checks if the username already exists in the database to prevent duplicate accounts.
 * Hashes the password using bcrypt for secure storage.
 * Creates a new user record and a corresponding account record with an initial random balance.
 * Generates a JWT token for the user and returns it along with a success message.
 *
 * @param {Object} req - The request object containing the signup information.
 * @param {Object} res - The response object used to send back the HTTP response.
 */
userRouter.post("/signup", async (req, res) => {
  try {
    // Validate request body against the defined Zod schema
    const { success, error } = signupZod.safeParse(req.body);

    // If validation fails, return an error response
    if (!success) {
      console.error("Validation error:", error);
      res.status(411).json({
        success: success,
        message: "Validation error occurred",
        error: error.errors, // Sending detailed error messages back to the client
      });
      return; // Return to avoid executing further code
    }

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username: req.body.username });

    // If user exists, return an error response
    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken / Incorrect inputs",
      });
    }

    // Hash the password for secure storage
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user record in the database
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    // Retrieve the newly created user's ID
    const userId = user._id;

    // Create a corresponding account record with an initial random balance
    await Account.create({
      userId,
      balance: Math.ceil(1 + Math.random() * 10000),
    });

    // Generate a JWT token for the user
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    // Return a success response with the generated token
    return res.status(200).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    // Log and return an error response if an exception occurs
    console.error("Error parsing request body:", error);
    res.status(400).json({ message: "Error parsing request body" });
  }
});

//*************** SIGNIN ********************* */

const signinZod = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

userRouter.post("/signin", async (req, res) => {
  const { success } = signinZod.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );

  res.json({
    token: token,
  });
});

//*************** UPDATE USER ********************* */

const updateZod = zod.object({
  password: zod.string().min(8),
  firstname: zod.string(),
  lastname: zod.string(),
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = updateZod.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne(req.body, {
    id: req.userId,
  });

  res.json({
    message: "Updated successfully",
  });
});

//*************** GETTING ALL USERS OR SPECIFIC TO THE FILTER ********************* */

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = userRouter;

//*************** CHECKING IF THE USER IS LOGGED IN OR NOT ********************* */

userRouter.get("/me", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId });
  // console.log(user);
  const amount = await Account.findOne({ userId });
  // console.log(user.firstname);
  // console.log(amount.balance);
  res.json({
    firstname: user.firstname,
    amount: amount.balance,
  });
});
