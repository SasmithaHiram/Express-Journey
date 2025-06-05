require("dotenv").config();
const morgan = require("morgan");
const port = process.env.PORT;
const express = require("express");
const app = express();
app.use(express.json());
const Joi = require("joi");
const logger = require("./logger");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const helmet = require("helmet");
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled");
}

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

app.post("/api/course/create", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
  console.log(course);
});

app.put("/api/course/update/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The coursewith the given ID was not found");

  const { error } = validateCourse(req.body);

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/course/delete/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The coursewith the given ID was not found");

  const index = courses.indexOf(course);

  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(course);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
