const startDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
require("dotenv").config();
const morgan = require("morgan");
const config = require("config");
const port = process.env.PORT;
const express = require("express");
const app = express();
app.use(express.json());
const Joi = require("joi");
const logger = require("./middleware/logger");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const helmet = require("helmet");
const courses = require("./routes/courses");
app.use(helmet());
app.use("/api/courses", courses);
const home = require('./routes/home');
app.use('/', home)

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startDebugger("Morgan enabled");
}

dbDebugger("Connectedto the database");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
