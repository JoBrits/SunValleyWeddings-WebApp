// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  eventGuests: { type: Number, required: true },
  eventNote: { type: String, required: true },
  status: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
