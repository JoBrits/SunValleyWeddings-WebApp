// Import Models
const Booking = require("../models/BookingsModel");

// Send general booking
const bookingsGeneral = async (req, res) => {
  try {
    const { name, email, events } = req.body;

    // Validate input
    if (!name || !email || !events ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save booking to the database
    const newBooking = new Booking({ name, email, events });
    await newBooking.save();

    res.status(201).json({ message: "Booking request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to booking request" });
  }
};

module.exports = { bookingsGeneral};