const express = require("express");
const { enquiry, joinTeam } = require("../controllers/Email");


const router = express.Router();

router.post("/enquiry", enquiry);
router.post("/joinTeam", joinTeam);

module.exports = router;
