// models/UserModel.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the User schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Trim whitespace
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving user document
UserSchema.pre("save", async function (next) {
  try {
    // Only hash the password if it has been modified (or is new)
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next(); // Continue to save the document
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

// Define the User model, checking if it is already defined to avoid OverwriteModelError
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = UserModel;
