const express = require("express");

// Import controller functions
const {
  postSchedule,
  getAllSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");

const router = express.Router();

router.post("/", postSchedule); // save a new schedules
router.get("/", getAllSchedules); // retrieve all schedules for a user
router.get("/:eventID", getSchedule); // retrieve schedule
router.put("/:eventID", updateSchedule); // update schedule
router.delete("/:eventID", deleteSchedule); // delete schedule

module.exports = router;
