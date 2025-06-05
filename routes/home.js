const express = require("express");
const router = express.Router();

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

module.exports = router;
