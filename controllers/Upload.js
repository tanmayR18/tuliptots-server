const { uploadImageToCloudinary } = require("../utlis/imageUploader");
const ImageModel = require("../models/Image");
const VideoModel = require("../models/Video");
const { uploadVideoToCloudinary } = require("../utlis/videoUploader");
const cloudinary = require("cloudinary").v2;

exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;
    console.log("file", file);

    const image = await uploadImageToCloudinary(
      file,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    // Save the secure_url to MongoDB
    const savedImage = await ImageModel.create({
      url: image.secure_url,
      public_id: image.public_id, // ✅ add this
    });

    res.status(200).json({
      success: true,
      message: `Image added successfully`,
      data: savedImage,
    });
  } catch (error) {
    console.error("Error saving image:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No video file uploaded",
      });
    }

    const video = await uploadVideoToCloudinary(file, process.env.FOLDER_NAME);

    // Save to DB
    const savedVideo = await VideoModel.create({
      url: video.secure_url,
      public_id: video.public_id, // ✅ add this
    });

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      data: savedVideo,
    });
  } catch (error) {
    console.error("Video Upload Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteImage = async (req, res) => {
  const { id } = req.body;

  try {
    const image = await ImageModel.findById(id);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.public_id, {
      resource_type: "image",
    });

    // Delete from MongoDB
    await ImageModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteVideo = async (req, res) => {
  const { id } = req.body;

  try {
    const video = await VideoModel.findById(id);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(video.public_id, {
      resource_type: "video", // 👈 important difference!
    });

    // Delete from MongoDB
    await VideoModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
