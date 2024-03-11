const express = require("express");
const cors = require("cors");
// const bodyparser = require("body-parser");
const app = express();
const mainRouter = require("./routes/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.listen(3000, () => {
  console.log("Port runnning at 3000");
});
