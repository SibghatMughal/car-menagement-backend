const { responseHandler } = require("../utils/helpers");
const { validationResult } = require("express-validator");
const { MESSAGES, SORT_ORDER } = require("../utils/constants");
const CarModel = require("../models/carModel"); // Mongoose model for Car
const CategoryModel = require("../models/categoryModel"); // Mongoose model for Category
const mongoose = require("mongoose");

const createCar = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHandler(res, 400, {
        success: false,
        errors: errors.array(),
      });
    }

    const { model, color, registration_no, category_id } = req?.body;

    const car = await CarModel.create({
      model,
      color,
      registration_no,
      category_id,
    });



    return responseHandler(res, 201, car);
  } catch (err) {
    responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getCars = async (req, res) => {
  try {
    const { pageNo = 1, perPage = 10, orderBy = "updatedAt", order = SORT_ORDER.DESC } = req.query;

    // Ensure valid pagination inputs
    const page = Math.max(0, pageNo - 1); // Page numbers should start from 0
    const limit = Math.max(1, parseInt(perPage)); // Ensure perPage is at least 1

    const sort = { [orderBy]: order === SORT_ORDER.ASC ? 1 : -1 };

    // Fetch the cars with pagination and population
    const cars = await CarModel.find()
      .populate("category_id") // Just use the string name for the reference
      .sort(sort)
      .skip(page * limit)
      .limit(limit);

    // Fetch the total number of cars
    const total = await CarModel.countDocuments();

    // Respond with cars and total count
    return responseHandler(res, 200, { cars, total });
  } catch (err) {
    console.error("Error fetching cars:", err); // Log the error for debugging
    return responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};


const getCar = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return responseHandler(res, 400, { message: 'Invalid car ID format' });
    }

    // Find the car by ID and populate the category_id
    const car = await CarModel.findById(id).populate("category_id");

    // Check if the car was found
    if (!car) {
      return responseHandler(res, 404, { message: MESSAGES.NOT_FOUND });
    }

    // Return the car data
    return responseHandler(res, 200, car);
  } catch (err) {
    console.error("Error fetching car:", err); // Log the error for debugging
    return responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req?.params;
    const deleted = await CarModel.findByIdAndDelete(id);

    if (!deleted) {
      return responseHandler(res, 404, { message: MESSAGES.NOT_FOUND });
    }

    return responseHandler(res, 200, { message: "Car deleted successfully" });
  } catch (err) {
    responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const updateCar = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHandler(res, 400, {
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req?.params;
    const { model, registration_no, color, category_id } = req?.body;

    const updatedCar = await CarModel.findByIdAndUpdate(
      id,
      { model, registration_no, color, category_id },
      { new: true }
    );

    if (!updatedCar) {
      return responseHandler(res, 404, { message: MESSAGES.NOT_FOUND });
    }

    return responseHandler(res, 200, updatedCar);
  } catch (err) {
    responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const totalNumberofCars = async (req, res) => {
  try {
    const count = await CarModel.countDocuments();
    return responseHandler(res, 200, `${count}`);
  } catch (err) {
    responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteCarOnCategoryDeletion = async (category_id) => {
  return await CarModel.deleteMany({ category_id });
};

module.exports = {
  createCar,
  getCars,
  getCar,
  deleteCar,
  updateCar,
  totalNumberofCars,
  deleteCarOnCategoryDeletion,
};
