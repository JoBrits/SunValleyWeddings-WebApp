// Import Models
const Guest = require("../models/GuestsModel");

// Send new Guest
const postGuest = async (req, res) => {
  try {
    const { name, surname, email, contact_number, status, role, eventID } = req.body;
    const newGuest = new Guest({
      name,
      surname,
      email,
      contact_number,
      role,
      status,
      eventID,
    });
    await newGuest.save();
    res.status(201).json(newGuest);
  } catch (error) {
    res.status(500).json({ error: "Failed to add guest" });
  }
};

// Get all Guests for a specific event
const getGuests = async (req, res) => {
  try {
    const { eventID } = req.params; // Extract eventID from request parameters

    if (!eventID) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    const guests = await Guest.find({ eventID }); // Filter guests by eventID

    res.status(200).json(guests);
  } catch (error) {
    console.error("Error fetching guests:", error);
    res.status(500).json({ error: "Failed to fetch guests" });
  }
};

// Get individual Guest
const getGuest = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params._id);
    if (!guest) return res.status(404).json({ error: "Guest not found" });
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch guest" });
  }
};

// Update Guest details
const updateGuest = async (req, res) => {
    try {
      const { guest_id } = req.params; // Extract guest ID from request parameters
      {console.log(guest_id)}

      if (!guest_id) {
        return res.status(400).json({ error: "Guest ID is required" });
      }
  
      const updatedGuest = await Guest.findByIdAndUpdate(guest_id, req.body, { 
        new: true, // Return the updated document
        runValidators: true, // Ensure validations are applied
      });
  
      if (!updatedGuest) {
        return res.status(404).json({ error: "No such guest found" });
      }
  
      res.status(200).json(updatedGuest);
    } catch (error) {
      console.error("Error updating guest:", error);
      
      if (error.name === "CastError") {
        return res.status(400).json({ error: "Invalid guest ID format" });
      }
  
      res.status(500).json({ error: "Failed to update guest" });
    }
  };

// Delete Guest details

const deleteGuest = async (req, res) => {
    try {
      const { guest_id } = req.params; // Extract guest ID from request parameters
      {console.log(guest_id)}

      if (!guest_id) {
        return res.status(400).json({ error: "Guest ID is required" });
      }
  
      const updatedGuest = await Guest.findByIdAndDelete(guest_id, req.body, { 
        runValidators: true, // Ensure validations are applied
      });
  
      if (!updatedGuest) {
        return res.status(404).json({ error: "No such guest found" });
      }
  
      res.status(200).json(updatedGuest);
    } catch (error) {
      console.error("Error updating guest:", error);
      
      if (error.name === "CastError") {
        return res.status(400).json({ error: "Invalid guest ID format" });
      }
  
      res.status(500).json({ error: "Failed to update guest" });
    }
  };

module.exports = { postGuest, getGuests, getGuest, updateGuest, deleteGuest };
