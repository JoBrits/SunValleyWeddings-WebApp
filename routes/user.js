const express = require("express");

// user controller functions
const { loginUser, signupUser, getUsers, updateUser, deleteUser } = require('../controllers/userController')

const router = express.Router()

router.post('/Login', loginUser) // Login route
router.post('/Signup', signupUser) // Signup route
router.get("/users", getUsers); // fetch all bookings
router.delete('/:id', deleteUser) // Update route
router.put('/:id', updateUser) // Update route

module.exports = router

