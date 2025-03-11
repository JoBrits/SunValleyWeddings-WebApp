const express = require("express");

// user controller functions
const { loginUser, signupUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController')

const router = express.Router()

router.post('/Login', loginUser) // Login route
router.post('/Signup', signupUser) // Signup route
router.get("/users", getUsers); // fetch all users route
router.get("/:id", getUser); // fetch one user route
router.delete('/:id', deleteUser) // delete user route
router.put('/:id', updateUser) // update user route

module.exports = router

