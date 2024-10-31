// models/CategoryModel.js

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  cars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car" // Assuming your car model is named "Car"
  }]
});

// Create a virtual property 'id' that maps to the document's '_id'
categorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
categorySchema.set('toJSON', {
  virtuals: true,
});

categorySchema.set('toObject', {
  virtuals: true,
});

// Avoid registering the model multiple times
const CategoryModel = mongoose.models.Category || mongoose.model("Category", categorySchema);
module.exports = CategoryModel;
