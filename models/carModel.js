// models/CarModel.js

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  registration_no: {
    type: String,
    required: true,
    unique: true, // Ensure that registration numbers are unique
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to the Category model
    required: true,
  },
});

// Create a virtual property 'id' that maps to the document's '_id'
carSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
carSchema.set('toJSON', {
  virtuals: true,
});

carSchema.set('toObject', {
  virtuals: true,
});

// Avoid registering the model multiple times
const CarModel = mongoose.models.Car || mongoose.model("Car", carSchema);
module.exports = CarModel;
