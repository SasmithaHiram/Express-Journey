const app = express();
import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import mongoose, { connect, Schema } from "mongoose";

app.use(json());

app.listen(port, () => {
  console.log(`EXPRESS APP IS RUNNING : ${port}`);
});

connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("CONNECTED TO MONGODB...");
  })
  .catch((err) => console.error("COULD NOT CONNECT TO MONGODB", err));

const courseSchema = new Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node",
    author: "Sasmitha",
    tags: ["node", "backend"],
    isPublished: true,
  });

  const result = await course.save();
}

createCourse();

async function getAll() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal)
  // in
  // nin (not in)

  const cousers = await Course.find().or([
    { author: "Sasmitha" },
    { isPublished: "true" },
  ]);
  // find({ price: { $in: [10, 15, 20] } });
  // find({price: {$gt: 10, $lte: 20}})
  // find({ author: "Sasmitha", isPublished: true })
  //   .limit(2)
  //   .sort({ name: -1 })
  //   .select({ name: 1, tags: 1 });
  console.log(cousers);
}

getAll();
