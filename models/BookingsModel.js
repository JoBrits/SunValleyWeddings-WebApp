// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}); 

module.exports = mongoose.model("Booking", bookingSchema);
