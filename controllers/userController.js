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

    // Return role along with email and token
    res.status(200).json({ email, role: user.role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  // Default, Admin se in database for now
  const role = "user";

  try {
    // Static Signup Method on the user model
    const user = await User.signup(name, email, password, role);

    // create token
    const token = createToken(user._id);

    // return email and token
    res.status(200).json({ name, email, role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
