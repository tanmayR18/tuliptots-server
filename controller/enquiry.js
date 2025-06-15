exports.enquiry = async (req, res) => {
  try {
    const {
      parentName,
      childName,
      dob,
      occupation,
      email,
      number,
      address,
      program,
      message,
    } = req.body;

    const template = enquiryTemplate({
      parentName,
      childName,
      dob,
      occupation,
      email,
      number,
      address,
      program,
      message,
    });

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
      to: "tanmayrane51@gmail.com",
      subject: "Admission Enquiry",
      html: template,
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
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
};

const enquiryTemplate = ({
  parentName,
  childName,
  dob,
  occupation,
  email,
  number,
  address,
  program,
  message,
}) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>School Enquiry</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .header {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #2c3e50;
    }
    .section {
      margin-bottom: 12px;
    }
    .label {
      font-weight: bold;
      color: #555;
    }
    .value {
      color: #333;
    }
    .footer {
      margin-top: 20px;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">New School Enquiry</div>

    <div class="section">
      <span class="label">Parent's Name:</span>
      <span class="value">${parentName}</span>
    </div>

    <div class="section">
      <span class="label">Child's Name:</span>
      <span class="value">${childName}</span>
    </div>

    <div class="section">
      <span class="label">Date of Birth:</span>
      <span class="value">${dob}</span>
    </div>

    <div class="section">
      <span class="label">Occupation:</span>
      <span class="value">${occupation}</span>
    </div>

    <div class="section">
      <span class="label">Email:</span>
      <span class="value">${email}</span>
    </div>

    <div class="section">
      <span class="label">Phone Number:</span>
      <span class="value">${number}</span>
    </div>

    <div class="section">
      <span class="label">Address:</span>
      <span class="value">${address}</span>
    </div>

    <div class="section">
      <span class="label">Program Enquired:</span>
      <span class="value">${program}</span>
    </div>

    <div class="section">
      <span class="label">Message:</span><br />
      <span class="value">${message}</span>
    </div>

    <div class="footer">
      Please respond to this enquiry at your earliest convenience.
    </div>
  </div>
</body>
</html>
`;
};
