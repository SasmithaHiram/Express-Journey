const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT;
const app = express();
app.use(bodyParser.json());

app.post("/product/create/:id", (req, res) => {
  let body = body;
  let id = req.params.id;
  res.send(body);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Express app listening on port ${port}!`);
});
