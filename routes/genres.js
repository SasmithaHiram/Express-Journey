const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genres = [
  {
    id: 1,
    name: "Action",
  },
  {
    id: 2,
    name: "Horror",
  },
  {
    id: 3,
    name: "Romance",
  },
];

router.post("/create", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

router.put("/update/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));

  if (!genre)
    return res.status(404).send("The course with the given ID was not found");

  const { error } = validateCourse(req.body);

  if (error) res.status(404).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/delete/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));

  if (!genre)
    return res.status(404).send("The course with the given ID was not found");

  genres.splice(genre, 1);
  res.send(genre);
});

router.get("/all", (req, res) => {
  res.send(genres);
});

function validateCourse(course) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(course);
}

module.exports = router;
