require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();

const courses = [
  { id: 1, name: "Sinhala" },
  {
    id: 2,
    name: "English",
  },
];

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The coursewith the given ID was not found");
  res.send(course);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
