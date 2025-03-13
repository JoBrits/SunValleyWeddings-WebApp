// Import Models
const Schedule = require("../models/ScheduleModel");

// Post new Schedule
const postSchedule = async (req, res) => {
  try {
    const {
      eventID,
      arrival,
      ceremony,
      photos,
      cocktails,
      reception,
      speechesAndFirstDance,
      cakeCutting,
      entertainment,
      farewell,
    } = req.body;

    // Validate required fields
    if (!eventID) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    // Create a new schedule
    const schedule = new Schedule({
      eventID,
      arrival,
      ceremony,
      photos,
      cocktails,
      reception,
      speechesAndFirstDance,
      cakeCutting,
      entertainment,
      farewell,
    });

    // Save to MongoDB
    await schedule.save();

    res
      .status(201)
      .json({ message: "Schedule created successfully", schedule });
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all Schedules for a specific event
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find(); // Fetch all schedules from MongoDB

    if (!schedules.length) {
      return res.status(404).json({ message: "No schedules found" });
    }

    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get individual Schedule
const getSchedule = async (req, res) => {
  try {
    const { eventID } = req.params;

    const schedule = await Schedule.findOne({ eventID });

    if (!schedule) {
      return res
        .status(404)
        .json({ message: "Schedule not found for this event" });
    }

    res.status(200).json(schedule);
  } catch (error) {
    console.error("Error fetching schedule by eventID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update individual Schedule section
const updateSchedule = async (req, res) => {
  try {
    const { eventID } = req.params;
    const { sectionKey, sectionData } = req.body; // Expecting sectionKey to identify the section and sectionData for the updated values

    // Find the schedule by eventID
    const schedule = await Schedule.findOne({ eventID });

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found for this event" });
    }

    // Check if the section exists
    if (!schedule[sectionKey]) {
      return res.status(404).json({ message: `Section with key ${sectionKey} not found` });
    }

    // Update the specific section with the new data
    schedule[sectionKey] = { ...schedule[sectionKey], ...sectionData };

    // Save the updated schedule
    const updatedSchedule = await schedule.save();

    res.status(200).json(updatedSchedule); // Return the updated schedule
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Delete Schedule details
const deleteSchedule = async (req, res) => {
  try {
    const { eventID } = req.params;

    const deletedSchedule = await Schedule.findOneAndDelete({ eventID });

    if (!deletedSchedule) {
      return res
        .status(404)
        .json({ message: "Schedule not found for this event" });
    }

    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  postSchedule,
  getAllSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
};
