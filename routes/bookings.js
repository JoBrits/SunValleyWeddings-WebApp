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

router.post("/", createBookingRequest); // create new booking
router.put("/:_id", updateBookingRequest); // update booking
router.delete("/:_id", deleteBookingRequest);  // delete booking
router.get("/booking", getBookingRequest); // fetch specific booking
router.get("/bookings", getBookingsRequest); // fetch all bookings

module.exports = router;
