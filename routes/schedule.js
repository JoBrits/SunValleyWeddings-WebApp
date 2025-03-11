const express = require("express");

// Import controller functions
const {
  postSchedule,
  getAllSchedules,
  getSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");

const router = express.Router();

router.post("/", postSchedule); // save a new schedules
router.get("/all", getAllSchedules); // retrieve all schedules for a user
router.get("/:eventID", getSchedules); // retrieve all schedules for a user
router.get("/schedule/:Schedule_id", getSchedule); // retrieve schedule
router.put("/:schedule_id", updateSchedule); // update schedule
router.delete("/:schedule_id", deleteSchedule); // delete schedule

module.exports = router;
