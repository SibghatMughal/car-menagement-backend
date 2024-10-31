// models/index.js

const mongoose = require("mongoose");
const env = require("dotenv");

env.config(); // Load environment variables

// Import models
const carModel = require("./CarModel");
const userModel = require("./UserModel");
const categoryModel = require("./CategoryModel");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
};

// Export models and connect function
module.exports = {
  connectDB,
  carModel,
  userModel,
  categoryModel,
};
