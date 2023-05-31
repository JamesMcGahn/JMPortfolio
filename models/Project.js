import mongoose from "mongoose";
import slugify from "slugify";

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Add a Title"],
    trim: true,
    unique: true,
  },
  slug: {
    type: String,
  },
  mainPage: {
    type: Boolean,
  },
  subtitle: {
    type: String,
    required: [true, "Add a Subtitle"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Add a Description"],
    trim: true,
  },
  challenges: {
    type: String,
    required: [true, "Add a Challenge"],
    trim: true,
  },
  stack: [{ type: String, required: true }],
  imageUrl: [
    {
      url: String,
      filename: String,
    },
  ],
  gitUrl: {
    type: String,
    required: [true, "Add a Image Url"],
    trim: true,
  },
  liveUrl: {
    type: String,
    required: [true, "Add a Image Url"],
    trim: true,
  },
});

ProjectSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.models.Project
  ? mongoose.models.Project
  : mongoose.model("Project", ProjectSchema);
