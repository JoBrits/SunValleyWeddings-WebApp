const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
    required: true,
  }, 
  arrival: {
    time: { type: String, required: false },
    heading: { type: String, required: false },
    location: { type: String, required: false },
    note: { type: String, required: false },
    dressCode: { type: String, required: false },
  },
  ceremony: {
    time: { type: String, required: false },
    heading: { type: String, required: false },
    location: { type: String, required: false },
    note: { type: String, required: false },
    dressCode: { type: String, required: false },
  },
  photos: {
    time: { type: String, required: false },
    heading: { type: String, required: false },
    location: { type: String, required: false },
    note: { type: String, required: false },
    dressCode: { type: String, required: false },
  },
  cocktails: {
    time: { type: String, required: false },
    heading: { type: String, required: false },
    location: { type: String, required: false },
    note: { type: String, required: false },
    dressCode: { type: String, required: false },
  },
  reception: {
    time: { type: String, required: false },
    heading: { type: String, required: false },
    location: { type: String, required: false },
    note: { type: String, required: false },
    dressCode: { type: String, required: false },
  },
  speechesAndFirstDance: {
    time: { type: String, required: false },
    heading: { type: String, required: false },
    location: { type: String, required: false },
    note: { type: String, required: false },
    dressCode: { type: String, required: false },
  },
  cakeCutting: {
    time: { type: String, required: false },
    heading: { type: String, required: false },
    location: { type: String, required: false },
    note: { type: String, required: false },
    dressCode: { type: String, required: false },
  },
  entertainment: {
    time: { type: String, required: false },
    heading: { type: String, required: false },
    location: { type: String, required: false },
    note: { type: String, required: false },
    dressCode: { type: String, required: false },
  },
  farewell: {
    time: { type: String, required: false },
    heading: { type: String, required: false },
    location: { type: String, required: false },
    note: { type: String, required: false },
    dressCode: { type: String, required: false },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
