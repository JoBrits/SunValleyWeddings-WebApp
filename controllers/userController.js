// Import Models
const User = require("../models/UserModel");

// Import JWT
const jwt = require("jsonwebtoken");

// Function JWT
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Static Login Method on the user model
  try {
    // Static Signup Method on the user model
    const user = await User.login(email, password);

    // create token
    const token = createToken(user._id);

    // Return role along with name, email and other
    res
      .status(200)
      .json({ name: user.name, email, role: user.role, id: user._id, eventID: user.eventID, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user
const signupUser = async (req, res) => {
  const { name, surname, email, password } = req.body;
  // Default, Admin se in database for now
  const role = "user";

  try {
    // Static Signup Method on the user model
    const user = await User.signup(name, surname, email, password, role);

    // create token
    const token = createToken(user._id);

    // return email and token
    res.status(200).json({ name, surname, email, role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch one users
const getUser = async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch User" });
  }
};

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords for security
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, password } = req.body;

  try {
    // Find user by ID
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields if provided
    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (email) user.email = email;
    if (password) user.password = password;

    // Save updated user
    await user.save();

    // Create new token
    const token = createToken(user._id);

    res
      .status(200)
      .json({ name: user.name, surname: user.surname, email: user.email, id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if _id exists
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find and delete the booking
    const deletedUser = await User.findByIdAndDelete(id);

    // If no booking is found
    if (!deletedUser) {
      return res.status(404).json({ error: "No such user found" });
    }

    // Respond with success message
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = {
  loginUser,
  signupUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
};
