const express = require("express");

// Import controller functions
const { postGuest, getGuests, getGuest, updateGuest } = require("../controllers/guestsController");

const router = express.Router();

router.post("/", postGuest); // save a new guests
router.get("/:event_id", getGuests); // retrieve all guests for a user
router.get("/:guest_id", getGuest); // retrieve guest
router.put("/:_id", updateGuest); // update guest

module.exports = router;
