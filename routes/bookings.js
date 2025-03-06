const express = require("express");

// Import controller functions
const { 
    createBookingRequest,
    getBookingsRequest,
    getBookingRequest,
    deleteBookingRequest,
    updateBookingRequest,
 } = require("../controllers/bookingsController");

const router = express.Router();

router.get("/bookings", getBookingsRequest); // fetch all bookings
router.get("/:email", getBookingRequest); // fetch one booking
router.post("/", createBookingRequest); // create new booking
router.put("/:_id", updateBookingRequest); // update booking
router.delete("/:_id", deleteBookingRequest);  // delete booking

module.exports = router;
