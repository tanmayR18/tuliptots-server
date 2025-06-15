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
        <span class="value">{${childName}}</span>
      </div>
      <div class="field">
        <span class="label">Age:</span>
        <span class="value">{${age}}</span>
      </div>
      <div class="field">
        <span class="label">DOB:</span>
        <span class="value">{${dob}}</span>
      </div>
    </div>
  </body>
</html>`;
};
