const verifiedEmails = ["tanmayrane51@gmail.com"];

exports.isLogin = async (req, res, next) => {
  try {
    const email = req.body.email || req.file.email;
    if (!verifiedEmails?.includes(email)) {
      return res.status(401).json({
        sucess: false,
        message: "Unauthorized user",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User  cannot be verified, please try again",
    });
  }
};
