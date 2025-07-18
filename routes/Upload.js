const express = require("express");
const { getCall, postCall } = require("../controllers/Test");
const { uploadImage, uploadVideo, deleteImage, deleteVideo } = require("../controllers/Upload");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

router.post("/uploadImage", upload.single("file"), uploadImage);
router.post("/uploadVideo", upload.single("file"), uploadVideo);
router.delete("/deleteImage", deleteImage);
router.delete("/deleteVideo", deleteVideo);

module.exports = router;
