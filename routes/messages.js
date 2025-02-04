const express = require("express");

// user controller functions
const { messageGeneral, messagesInquiries } = require('../controllers/messagesController')

const router = express.Router()

router.post('/send', messageGeneral) // POST route to save a new message
router.get('/inquiries', messagesInquiries) // GET route to display all message

module.exports = router

