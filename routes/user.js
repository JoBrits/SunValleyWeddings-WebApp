const express = require("express");

// user controller functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()

router.post('/login', loginUser) // Login route
router.post('/signup', signupUser) // Signup route

module.exports = router

