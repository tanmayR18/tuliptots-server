const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const multer = require("multer");
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });
const cors = require("cors");
const port = process.env.PORT;
const { joinTeam } = require("./controller/joinTeam");
const { enquiry } = require("./controller/enquiry");

const testRoutes = require("./routes/Test");
const emailRoutes = require("./routes/Email");
const uploadRoutes = require("./routes/Upload");
const database = require('./config/database')
const {cloudinaryConnect} = require('./config/cloudinary')

// Middleware
app.use(bodyParser.json()); // to parse JSON request bodies

//database connect
database.connect(); 

//cloudinary connection
cloudinaryConnect();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/email", upload.array("file", 10), async (req, res) => {
  const file = req.files;
  //   console.log("file", file);
  //   console.log('body', req.body);

  const {
    to,
    subject,
    childName,
    nickName,
    dob,
    age,
    gender,
    nationality,
    motherTongue,
    homeLanguage,
    currentAddress,
    permanentAddress,
    course,
    // child development, preference, comfort needs
    isPottyTrained,
    isSelfFeeding,
    sleepRoutine,
    napDuringDay,
    napTiming,
    napDuration,
    useAnyPacifier,
    pacifierDetails,
    foodPreference,
    favouriteSnacks,
    feedingRoutine,
    thingsToClamWhenUpset,
    specificWordsUsed,
    seperationAnxiety,
    easeTransitionForSeperationAnxiety,
    distressTiggers,
    ritualsToComfort,
    interest,
    hobbies,
    howFreeTimeSpent,
    dislikes,
    comfortObject,
    socialStyle,
    screenTimePerDay,
    typeOfContent,
    favouriteCharacterSongShow,
    otherNotes,
    //Parent/Guardian details
    motherName,
    motherDob,
    motherOccupation,
    motherNumber,
    motherEmail,
    motherAadharNumber,
    fatherName,
    fatherDob,
    fatherOccupation,
    fatherNumber,
    fatherEmail,
    fatherAadharNumber,
    guardianName,
    guardianDob,
    guardianOccupation,
    guardianNumber,
    guardianEmail,
    guardianAadharNumber,
    // Emergency contact detail
    emergencyName,
    emergencyRelation,
    emergencyNumber,
    emergencyEmail,
    emergencyAlternateNumber,
    //   documents
    childBirthDoc,
    childAadhaar,
    childPhoto,
    parentPhoto,
    parentAadhaar,
    residenceProof,
    medicalCertificate,
  } = req.body;

  //   if (
  //     !to ||
  //     !subject ||
  //     !childName ||
  //     !nickName ||
  //     !dob ||
  //     !age ||
  //     !gender ||
  //     !nationality ||
  //     !motherTongue ||
  //     !homeLanguage ||
  //     !currentAddress ||
  //     !permanentAddress ||
  //     !course ||
  //     !isPottyTrained ||
  //     !isSelfFeeding ||
  //     !sleepRoutine ||
  //     !napDuringDay ||
  //     !napTiming ||
  //     !napDuration ||
  //     !useAnyPacifier ||
  //     !pacifierDetails ||
  //     !foodPreference ||
  //     !favouriteSnacks ||
  //     !feedingRoutine ||
  //     !thingsToClamWhenUpset ||
  //     !specificWordsUsed ||
  //     !seperationAnxiety ||
  //     !easeTransitionForSeperationAnxiety ||
  //     !distressTiggers ||
  //     !ritualsToComfort ||
  //     !interest ||
  //     !hobbies ||
  //     !howFreeTimeSpent ||
  //     !dislikes ||
  //     !comfortObject ||
  //     !socialStyle ||
  //     !screenTimePerDay ||
  //     !typeOfContent ||
  //     !favouriteCharacterSongShow ||
  //     !otherNotes ||
  //     !motherName ||
  //     !motherDob ||
  //     !motherOccupation ||
  //     !motherNumber ||
  //     !motherEmail ||
  //     !motherAadharNumber ||
  //     !fatherName ||
  //     !fatherDob ||
  //     !fatherOccupation ||
  //     !fatherNumber ||
  //     !fatherEmail ||
  //     !fatherAadharNumber ||
  //     !guardianName ||
  //     !guardianDob ||
  //     !guardianOccupation ||
  //     !guardianNumber ||
  //     !guardianEmail ||
  //     !guardianAadharNumber ||
  //     !emergencyName ||
  //     !emergencyRelation ||
  //     !emergencyNumber ||
  //     !emergencyEmail ||
  //     !emergencyAlternateNumber
  //   ) {
  //     return res.status(400).json({ error: "Missing required fields" });
  //   }

  const admissionTemplate = admissionForm(req.body);

  // Create transporter (example with Gmail)
  let transporter = nodemailer.createTransport({
    secure: false,
    service: process.env.SERVICE,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.KEY,
    },
  });

  const attachmentsArr = file.map((f) => ({
    filename: f.originalname,
    content: f.buffer,
    contentType: f.mimetype,
    contentDisposition: "attachment",
  }));

  console.log("attachmentsArr", attachmentsArr);

  // Mail options
  let mailOptions = {
    from: process.env.SENDER_MAIL,
    to: to,
    subject: subject,
    html: admissionTemplate,
    attachments: attachmentsArr,
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

app.post("/jointeam", async (req, res) => {
  try {
    console.log(req.body);
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
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
});

app.post("/enquiry", async (req, res) => {
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
    res.status(500);
  }
});

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/email", emailRoutes);
app.use("/api/v1/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const admissionForm = ({
  to,
  subject,

  childName,
  nickName,
  dob,
  age,
  gender,
  nationality,
  motherTongue,
  homeLanguage,
  currentAddress,
  permanentAddress,
  course,
  // child development, preference, comfort needs
  isPottyTrained,
  isSelfFeeding,
  sleepRoutine,
  napDuringDay,
  napTiming,
  napDuration,
  useAnyPacifier,
  pacifierDetails,
  foodPreference,
  favouriteSnacks,
  feedingRoutine,
  thingsToClamWhenUpset,
  specificWordsUsed,
  seperationAnxiety,
  easeTransitionForSeperationAnxiety,
  distressTiggers,
  ritualsToComfort,
  interest,
  hobbies,
  howFreeTimeSpent,
  dislikes,
  comfortObject,
  socialStyle,
  screenTimePerDay,
  typeOfContent,
  favouriteCharacterSongShow,
  otherNotes,
  //Parent/Guardian details
  motherName,
  motherDob,
  motherOccupation,
  motherNumber,
  motherEmail,
  motherAadharNumber,
  fatherName,
  fatherDob,
  fatherOccupation,
  fatherNumber,
  fatherEmail,
  fatherAadharNumber,
  guardianName,
  guardianDob,
  guardianOccupation,
  guardianNumber,
  guardianEmail,
  guardianAadharNumber,
  // Emergency contact detail
  emergencyName,
  emergencyRelation,
  emergencyNumber,
  emergencyEmail,
  emergencyAlternateNumber,
  //   documents
  childBirthDoc,
  childAadhaar,
  childPhoto,
  parentPhoto,
  parentAadhaar,
  residenceProof,
  medicalCertificate,
}) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        line-height: 1.6;
      }
      .container {
        padding: 20px;
        max-width: 600px;
        margin: auto;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
      }
      h1 {
        text-align: center;
        color: #2c3e50;
      }
      h2 {
        color: #34495e;
        border-bottom: 1px solid #ccc;
        padding-bottom: 5px;
      }
      .field {
        margin: 10px 0;
      }
      .label {
        font-weight: bold;
      }
      .value {
        margin-left: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Details</h1>
      <h2>Child Details</h2>
      <div class="field">
        <span class="label">Name:</span>
        <span class="value">${childName}</span>
      </div>
      <div class="field">
        <span class="label">NickName:</span>
        <span class="value">${nickName}</span>
      </div>
      <div class="field">
        <span class="label">DOB:</span>
        <span class="value">${dob}</span>
      </div>
      <div class="field">
        <span class="label">Age:</span>
        <span class="value">${age}</span>
      </div>
      <div class="field">
        <span class="label">Gender:</span>
        <span class="value">${gender}</span>
      </div>
      <div class="field">
        <span class="label">Nationality:</span>
        <span class="value">${nationality}</span>
      </div>
      <div class="field">
        <span class="label">Mother Tongue:</span>
        <span class="value">${motherTongue}</span>
      </div>
      <div class="field">
        <span class="label">Home Language:</span>
        <span class="value">${homeLanguage}</span>
      </div>
      <div class="field">
        <span class="label">Current Address:</span>
        <span class="value">${currentAddress}</span>
      </div>
      <div class="field">
        <span class="label">Permanent Address:</span>
        <span class="value">${permanentAddress}</span>
      </div>
      <div class="field">
        <span class="label">Course applied:</span>
        <span class="value">${course}</span>
      </div>

      <h1>Child's Development, Preferences & Comfort Needs</h1>
    <h2>Developmental Milestones</h2>
    <div class="field">
        <span class="label">Is your child potty trained?</span>
        <span class="value">${isPottyTrained}</span>
      </div>
        <div class="field">
            <span class="label">Does your child self-feed?</span>
            <span class="value">${isSelfFeeding}</span>
        </div>
        <div class="field">
            <span class="label">Sleep/Nap Routine</span>
            <span class="value">${sleepRoutine}</span>
        </div>
        <div class="field">
            <span class="label">Does your child nap during the day?</span>
            <span class="value">${napDuringDay}</span>
        </div>
        <div class="field">
            <span class="label">Nap Timing</span>
            <span class="value">${napTiming}</span>
        </div>
        <div class="field">
            <span class="label">Nap Duration</span>
            <span class="value">${napDuration}</span>
        </div>
        <div class="field">
            <span class="label">Does your child use a pacifier or bottle?</span>
            <span class="value">${useAnyPacifier}</span>
        </div>
        <div class="field">
            <span class="label">Pacifier Details</span>
            <span class="value">${pacifierDetails}</span>
        </div>

        <h2>Food & Mealtime</h2>
        <div class="field">
            <span class="label">Food Preferences / Allergies / Dietary Restrictions</span>
            <span class="value">${foodPreference}</span>
        </div>
        <div class="field">
            <span class="label">Favourite snacks or comfort foods</span>
            <span class="value">${favouriteSnacks}</span>
        </div>
        <div class="field">
            <span class="label">Feeding routine (if any)</span>
            <span class="value">${feedingRoutine}</span>
        </div>

        <h2>Emotional Needs & Soothing</h2>
        <div class="field">
            <span class="label">What helps calm your child when upset? (e.g. hugs, songs, distractions)</span>
            <span class="value">${thingsToClamWhenUpset}</span>
        </div>
        <div class="field">
            <span class="label">Specific words/sounds your child uses (e.g. “hoo hoo” for hurt, “nana” for banana)</span>
            <span class="value">${specificWordsUsed}</span>
        </div>
        <div class="field">
            <span class="label">Does your child experience separation anxiety?</span>
            <span class="value">${seperationAnxiety}</span>
        </div>
        <div class="field">
            <span class="label">If yes, what helps ease transitions?</span>
            <span class="value">${easeTransitionForSeperationAnxiety}</span>
        </div>
        <div class="field">
            <span class="label">Common triggers for distress (e.g. loud noise, crowd, specific fears)</span>
            <span class="value">${distressTiggers}</span>
        </div>
        <div class="field">
            <span class="label">Phrases/rituals used at home to reassure or comfort</span>
            <span class="value">${ritualsToComfort}</span>
        </div>
        <h2>Preferences & Personality</h2>
        <div class="field">
            <span class="label">Favourite Activities or Interests</span>
            <span class="value">${interest}</span>
        </div>
        <div class="field">
            <span class="label">Hobbies (Art, Music, Dance, Outdoor Play, etc.):</span>
            <span class="value">${hobbies}</span>
        </div>
        <div class="field">
            <span class="label">How does your child prefer to spend free time?</span>
            <span class="value">${howFreeTimeSpent}</span>
        </div>
        <div class="field">
            <span class="label">Comfort object (e.g. soft toy, blanket)</span>
            <span class="value">${comfortObject}</span>
        </div>
        <div class="field">
            <span class="label">Social Style</span>
            <span class="value">${socialStyle}</span>
        </div>

        <h2>Media Exposure</h2>

        <div class="field">
            <span class="label">Approximate screen time per day</span>
            <span class="value">${screenTimePerDay}</span>
        </div>
        <div class="field">
            <span class="label">Type of content (Shows/Apps/Games)</span>
            <span class="value">${typeOfContent}</span>
        </div>
        <div class="field">
            <span class="label">Favourite characters/songs/shows</span>
            <span class="value">${favouriteCharacterSongShow}</span>
        </div>

        <h2>Other Notes</h2>
        <div class="field">
            <span class="label">Is there anything else you'd like us to know to support your child's comfort and happiness at Tulip Tots?</span>
            <span class="value">${otherNotes}</span>
        </div>

        <h1>Parent(s)/Guardian Details</h1>
        <h2> Mother's Details</h2>
        <div class="field">
            <span class="label">Full Name</span>
            <span class="value">${motherName}</span>
        </div>
        <div class="field">
            <span class="label">Date of birth</span>
            <span class="value">${motherDob}</span>
        </div>
        <div class="field">
            <span class="label">Occupation</span>
            <span class="value">${motherOccupation}</span>
        </div>
        <div class="field">
            <span class="label">Mobile Number</span>
            <span class="value">${motherNumber}</span>
        </div>
        <div class="field">
            <span class="label">Email ID</span>
            <span class="value">${motherEmail}</span>
        </div>
         <div class="field">
            <span class="label">Aadhar Number</span>
            <span class="value">${motherAadharNumber}</span>
        </div>

        <h2> Father's Details</h2>
        <div class="field">
            <span class="label">Full Name</span>
            <span class="value">${fatherName}</span>
        </div>
        <div class="field">
            <span class="label">Date of birth</span>
            <span class="value">${fatherDob}</span>
        </div>
        <div class="field">
            <span class="label">Occupation</span>
            <span class="value">${fatherOccupation}</span>
        </div>
        <div class="field">
            <span class="label">Mobile Number</span>
            <span class="value">${fatherNumber}</span>
        </div>
        <div class="field">
            <span class="label">Email ID</span>
            <span class="value">${fatherEmail}</span>
        </div>
         <div class="field">
            <span class="label">Aadhar Number</span>
            <span class="value">${fatherAadharNumber}</span>
        </div>

        <h2>Emergency Contact Details (Other than Parents)</h2>
         <div class="field">
            <span class="label">Name</span>
            <span class="value">${emergencyName}</span>
        </div>
         <div class="field">
            <span class="label">Relation to child</span>
            <span class="value">${emergencyRelation}</span>
        </div>
         <div class="field">
            <span class="label">Mobile Number</span>
            <span class="value">${emergencyNumber}</span>
        </div>
         <div class="field">
            <span class="label">Alternate Number</span>
            <span class="value">${emergencyAlternateNumber}</span>
        </div>



    </div>
  </body>
</html>`;
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
