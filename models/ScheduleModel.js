// models/Guest.js
const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
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
  restrictions: { 
    type: String, 
    required: false },
  allergies: { 
    type: String, 
    required: false },
  requirements: { 
    type: String, 
    required: false },
  createdAt: { 
    type: Date, 
    default: Date.now },
}); 

module.exports = mongoose.model("Schedule", scheduleSchema);
