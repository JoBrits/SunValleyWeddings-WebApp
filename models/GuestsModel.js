// models/Guest.js
const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  eventID: { 
    type: String, 
    required: true }, // set by user id
  name: { 
    type: String, 
    required: true },
  surname: { 
    type: String, 
    required: true },
  email: { 
    type: String, 
    required: true },
  contact_number: { 
    type: String, 
    required: true },
  role: { 
    type: String, 
    required: true },
  status: { 
    type: String, 
    required: true },
  createdAt: { 
    type: Date, 
    default: Date.now },
}); 

module.exports = mongoose.model("Guest", guestSchema);
