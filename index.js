const genres = require("./routes/genres");
require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use("/api/genre", genres);

app.listen(port, () => {
  console.log(`EXPRESS APP IS RUNNING : ${port}`);
});
