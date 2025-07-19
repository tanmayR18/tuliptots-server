const express = require("express");
const { getCall, postCall } = require("../controllers/Test");
const {
  uploadImage,
  uploadVideo,
  deleteImage,
  deleteVideo,
  getAllImages,
  getAllVideos,
} = require("../controllers/Upload");
const router = express.Router();
const multer = require("multer");
const { isLogin } = require("../middleware/auth");
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

router.post("/uploadImage", upload.single("file"), isLogin, uploadImage);
router.post("/uploadVideo", upload.single("file"), isLogin, uploadVideo);
router.delete("/deleteImage", isLogin, deleteImage);
router.delete("/deleteVideo", isLogin, deleteVideo);
router.get("/getImage", getAllImages);
router.get("/getVideo", getAllVideos);

module.exports = router;
