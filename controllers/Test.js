require('dotenv').config()

exports.getCall = async (req, res) => {
  try {
    return res.status(400).json({
      success: true,
      message: "get request hitted successfully",
    });
  } catch (error) {}
};

exports.postCall = async (req, res) => {
  const imageUrl = "http://something.jpg";
  try {
    return res.status(400).json({
      success: true,
      message: "get request hitted successfully",
      imageUrl,
    });
  } catch (error) {}
};
