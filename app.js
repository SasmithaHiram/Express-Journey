const express = require("express");
const bodyParser = require("body-parser");

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

app.listen(3000, () => {
  console.log("Express app listening on port 3000!");
});
