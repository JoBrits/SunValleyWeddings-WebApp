// Import Models
const Message = require("../models/MessagesModel");

// Send general message
const messageGeneral = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save message to the database
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Send general message
const messagesInquiries = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

module.exports = { messageGeneral, messagesInquiries };
