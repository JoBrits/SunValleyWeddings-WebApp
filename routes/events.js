const express = require("express");

// Import controller functions
const { postEventRequest, getEventRequests } = require("../controllers/eventsController");

const router = express.Router();

router.post("/event-request", postEventRequest); // POST route to save a new event
router.get("/events-requests", getEventRequests); // GET route to retrieve all events

module.exports = router;
