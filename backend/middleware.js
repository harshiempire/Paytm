const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate requests using JWT tokens.
 *
 * This middleware function checks for the presence of an Authorization header in the incoming request.
 * It expects the header to contain a JWT token, prefixed with 'Bearer '. If the token is present and valid,
 * the middleware decodes the token, extracts the user ID, and attaches it to the request object.
 * If the token is missing, not prefixed correctly, or invalid, the request is rejected with a 403 status code.
 *
 * @param {Object} req - The request object from Express.js. Contains information about the HTTP request.
 * @param {Object} res - The response object from Express.js. Used to send back the desired HTTP response.
 * @param {Function} next - A callback function to pass control to the next middleware function in the stack.
 */
const authMiddleware = (req, res, next) => {
  // Extract the Authorization header from the incoming request.
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is missing or does not start with 'Bearer '.
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // If the check fails, return a 403 Forbidden status code with an empty response body.
    return res.status(403).json({});
  }

  // Extract the JWT token from the Authorization header.
  const token = authHeader.split(" ")[1];

  try {
    // Attempt to verify and decode the JWT token using the secret key.
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("from the middleware ", decoded);

    // Check if the decoded token contains a userId property.
    if (decoded.userId) {
      // Attach the userId to the request object for use in subsequent middleware or route handlers.
      req.userId = decoded.userId;

      // Pass control to the next middleware function in the stack.
      next();
    } else {
      // If the decoded token does not contain a userId, return a 403 Forbidden status code.
      return res.status(403).json({});
    }
  } catch (err) {
    // If token verification fails, catch the error and return a 403 Forbidden status code.
    return res.status(403).json({});
  }
};

module.exports = {
  authMiddleware,
};
