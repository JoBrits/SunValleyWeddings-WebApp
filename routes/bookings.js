const express = require("express");

// Import controller functions
const { bookingsGeneral, getBookings } = require("../controllers/bookingsController");

const router = express.Router();

router.post("/request", bookingsGeneral); // POST route to save a new booking
router.get("/requests", getBookings); // GET route to retrieve all bookings

module.exports = router;
