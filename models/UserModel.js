const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
});

// Static Signup Method on the user model
userSchema.statics.signup = async function (email, password) {
  
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  // validator module
  if(!validator.isEmail(email)){
    throw Error("Please use a valid email address");
  }
  if(!validator.isStrongPassword(password)){
    throw Error("Please use a stronger password");
  }

  // If email already exists throw error
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  // use bcrypt module to hash password for additional security
  // use bcrypt salt to add additional characters that will be hashed
  const salt = await bcrypt.genSalt(10);
  // use bcrypt hash to hide password and add some salt
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// Static Login Method on the user model
userSchema.statics.login = async function (email, password) {
  
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // If user email already exists 
  const user  = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email or user does not exist"); // added or user does not exist for security keeping Incorrect email for testing
  }
  
  // use bcrypt to match password input password with db user.password
  const match = await bcrypt.compare(password, user.password)

  // password validation
  if (!match) {
    throw Error("Incorrect password or user does not exist"); // added or user does not exist for security keeping Incorrect password for testing
  }

  return user;

};

module.exports = mongoose.model("User", userSchema);
