// Import Models
const Booking = require("../models/BookingsModel");

// Send general booking
const bookingsGeneral = async (req, res) => {
  try {
    const { name, email, date, time, text } = req.body;

    // Validate input
    if (!name || !email || !date|| !time || !text ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save booking to the database
    const newBooking = new Booking({ name, email, date, time, text });
    await newBooking.save();

    res.status(201).json({ message: "Booking request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send booking request" });
  }
};

// Get all booking requests
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

module.exports = { bookingsGeneral, getBookings };