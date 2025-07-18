// models/Video.js

const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  public_id: {
    type: String,
    required: true, // because Cloudinary needs this to delete the image
  },
});

module.exports = mongoose.model("Video", videoSchema);
