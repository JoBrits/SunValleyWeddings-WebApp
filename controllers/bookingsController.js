// Import Models
const Booking = require("../models/BookingsModel");

// Create a booking
const createBookingRequest = async (req, res) => {
  const {
    title,
    name,
    surname,
    email,
    eventDate,
    eventTime,
    eventGuests,
    eventNote,
  } = req.body;

  // FrontEnd Error Message, detect empty fields
  let emptyFields = [];

  // Check for empty fields
  if (!title) {
    emptyFields.push("title");
  }
  if (!name) {
    emptyFields.push("name");
  }
  if (!surname) {
    emptyFields.push("surname");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!eventDate) {
    emptyFields.push("eventDate");
  }
  if (!eventTime) {
    emptyFields.push("eventTime");
  }
  if (!eventGuests) {
    emptyFields.push("eventGuests");
  }
  // if any fields are empty
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  // FrontEnd Error Message, detect more than 140 characters
  let characterLimitFields = [];
  // Check for  >= 140 fields
  if (eventNote.length >= 140) {
    characterLimitFields.push("eventNote");
  }
  // if any fields are over the character count
  if (characterLimitFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Cannot exceed 140 characters", characterLimitFields });
  }

  // Save booking to the database
  try {
    const booking = await Booking.create({
      title,
      name,
      surname,
      email,
      eventDate,
      eventTime,
      eventGuests,
      eventNote,
    });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch all bookings
const getBookingsRequest = async (req, res) => {
  try {
    const bookingRequests = await Booking.find();
    res.status(200).json(bookingRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};


// Fetch a specific booking
const getBookingRequest = async (req, res) => {};

// Delete a booking
const deleteBookingRequest = async (req, res) => {};

// Update a booking
const updateBookingRequest = async (req, res) => {
  // fetch id from body
  const { _id } = req.body;
  // find booking by _id property and update
  const booking = await Booking.findOneAndUpdate(
    { _id: _id },
    {
      ...req.body, // spread object from body
    }
  );
  // error handling
  if (!booking) {
    return res.status(404).json({ error: "No such item" });
  }
  // return do list item by id
  res.status(200).json(booking);
};

module.exports = {
  createBookingRequest,
  getBookingsRequest,
  getBookingRequest,
  deleteBookingRequest,
  updateBookingRequest,
};
