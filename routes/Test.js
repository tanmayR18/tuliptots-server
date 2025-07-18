const express = require("express")
const { getCall, postCall } = require("../controllers/Test")
const router = express.Router()

router.get('/getCall', getCall)
router.post('/postCall', postCall)

module.exports = router