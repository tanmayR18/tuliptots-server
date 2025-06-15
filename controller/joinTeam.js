exports.joinTeam = async (req, res) => {
  try {
    console.log(req);
    const { email, contactNumber, role, name, age, education } = req.body;

    const template = joinTeamTemplate({
      email,
      contactNumber,
      role,
      name,
      age,
      education,
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
      subject: "Job enquiry",
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
  } catch (error) {}
};

const joinTeamTemplate = ({
  email,
  contactNumber,
  role,
  name,
  age,
  education,
}) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Job Enquiry</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f6f6;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .header {
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 10px;
    }
    .section {
      margin-bottom: 15px;
    }
    .label {
      font-weight: bold;
      color: #555;
    }
    .value {
      color: #333;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">New Job Enquiry</div>

    <div class="section">
      <span class="label">Name:</span>
      <span class="value">${name}</span>
    </div>

    <div class="section">
      <span class="label">Email:</span>
      <span class="value">${email}</span>
    </div>

    <div class="section">
      <span class="label">Contact Number:</span>
      <span class="value">${contactNumber}</span>
    </div>

    <div class="section">
      <span class="label">Age:</span>
      <span class="value">${age}</span>
    </div>

    <div class="section">
      <span class="label">Education:</span>
      <span class="value">${education}</span>
    </div>

    <div class="section">
      <span class="label">Applied Role:</span>
      <span class="value">${role}</span>
    </div>

    <div class="section">
      <p>This candidate is interested in the above-mentioned role. Please get in touch with them for further discussion.</p>
    </div>
  </div>
</body>
</html>
`;
};
