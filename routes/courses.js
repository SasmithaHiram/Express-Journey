const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "Sinhala" },
  {
    id: 2,
    name: "English",
  },
];

app.get("/", (req, res) => {
  res.send(courses);
});

app.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The coursewith the given ID was not found");
  res.send(course);
});

app.post("/", (req, res) => {
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

app.put("/:id", (req, res) => {
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

app.delete("/:id", (req, res) => {
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

module.exports = router;
