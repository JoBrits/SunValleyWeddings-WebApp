const express = require("express");

// user controller functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()

router.post('/Login', loginUser) // Login route
router.post('/Signup', signupUser) // Signup route

module.exports = router

