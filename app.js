const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");
const port = process.env.PORT;

// Middleware
app.use(bodyParser.json()); // to parse JSON request bodies

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/email", upload.array("files", 10), async (req, res) => {
  const pdf = req.file;
  console.log("pdf", pdf);
  return;

  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Create transporter (example with Gmail)
  let transporter = nodemailer.createTransport({
    secure: false,
    service: process.env.SERVICE,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.KEY,
    },
  });

  // Mail options
  let mailOptions = {
    from: process.env.SENDER_MAIL,
    to: to,
    subject: subject,
    text: text,
    attachments: [
      {
        filename: "test.pdf", // File name seen in the email
        path: pdf.path,
      },
    ],
  };

  // Send mail
  try {
    let info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
