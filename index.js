require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
