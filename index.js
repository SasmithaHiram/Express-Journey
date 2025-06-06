import express, { json } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import genres from "./routes/genres.js";
import mongoose, { connect, Schema, model } from "mongoose";

app.use(json());
app.use("/api/genre", genres);
app.listen(port, () => {
  console.log(`EXPRESS APP IS RUNNING : ${port}`);
});

connect("mongodb://localhost:27017/playgorund")
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
