const express = require("express");

// user controller functions
const { loginUser, signupUser, updateUser } = require('../controllers/userController')

const router = express.Router()

router.post('/Login', loginUser) // Login route
router.post('/Signup', signupUser) // Signup route
router.put('/:id', updateUser) // Update route

module.exports = router

