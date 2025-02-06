// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
}); 

module.exports = mongoose.model("Event", eventSchema);
