const express = require("express");

// Import controller functions
const { postGuest, getGuests, getGuest, updateGuest, deleteGuest } = require("../controllers/guestsController");

const router = express.Router();

router.post("/", postGuest); // save a new guests
router.get("/:event_id", getGuests); // retrieve all guests for a user
router.get("/:guest_id", getGuest); // retrieve guest
router.put("/:guest_id", updateGuest); // update guest
router.delete("/:guest_id", deleteGuest); // delete guest

module.exports = router;
