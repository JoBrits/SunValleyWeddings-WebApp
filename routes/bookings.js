const express = require("express");

// user controller functions
const { bookingsGeneral } = require('../controllers/bookingsController')

const router = express.Router()

router.post('/request', bookingsGeneral) // POST route to save a new booking

module.exports = router

