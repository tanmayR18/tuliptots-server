// models/Image.js

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  public_id: {
    type: String,
    required: true, // because Cloudinary needs this to delete the image
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Image", imageSchema);
