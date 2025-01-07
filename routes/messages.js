const express = require("express");

// user controller functions
const { messageGeneral } = require('../controllers/messagesController')

const router = express.Router()

router.post('/send', messageGeneral) // POST route to save a new message

module.exports = router

