// models/Guest.js
const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  event_id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact_number: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}); 

module.exports = mongoose.model("Guest", guestSchema);
