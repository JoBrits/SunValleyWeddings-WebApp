// Import Models
const Event = require("../models/EventsModel");

// Send new event request
const postEventRequest = async (req, res) => {
  try {
    const { name, email, date, time, guests } = req.body;

    // Validate input
    if (!name || !email || !date|| !time || !guests ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save event to the database
    const newEvent = new Event({ name, email, date, time, guests });
    await newEvent.save();

    res.status(201).json({ message: "Event request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send event request" });
  }
};

// Get all events requests
const getEventRequests = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

module.exports = { postEventRequest, getEventRequests };