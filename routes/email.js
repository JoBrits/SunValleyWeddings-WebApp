const express = require("express");

// Import controller functions
const { postRegisterEmail } = require("../controllers/emailController");


const router = express.Router();

// Email sending route
router.post("/send-register", postRegisterEmail); // send email to user

module.exports = router;
