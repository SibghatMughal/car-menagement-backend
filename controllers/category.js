const { responseHandler } = require("../utils/helpers");
const { deleteCarOnCategoryDeletion } = require("./car");
const { validationResult } = require("express-validator");
const { MESSAGES } = require("../utils/constants");
const Category = require("../models/categoryModel"); // Assuming your Mongoose model file is named CategoryModel.js

const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHandler(res, 400, {
        success: false,
        errors: errors.array(),
      });
    }

    const { name } = req.body;
    const category = new Category({ name });
    await category.save();

    return responseHandler(res, 201, category);
  } catch (err) {
    console.error(err); // Log the error for debugging
    responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getCategories = async (req, res) => {
  try {
    const { pageNo = 1, perPage = 10, orderBy } = req.query;
    const sortOptions = {};

    if (orderBy) {
      sortOptions[orderBy] = 1; // Ascending order by default
    }

    const categories = await Category.find()
      .sort(sortOptions)
      .skip((pageNo - 1) * perPage)
      .limit(perPage);

    const total = await Category.countDocuments();
    return responseHandler(res, 200, {
      total,
      categories,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate("cars"); // Assuming cars is a reference field in Category

    if (!category) {
      return responseHandler(res, 404, { message: "Category not found" });
    }

    return responseHandler(res, 200, category);
  } catch (err) {
    console.error(err); // Log the error for debugging
    responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteCarOnCategoryDeletion(id); // Update to call the new delete function without transaction
    await Category.findByIdAndDelete(id);

    return responseHandler(res, 200, { message: "Category deleted successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const updateCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHandler(res, 400, {
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedCategory) {
      return responseHandler(res, 404, { message: "Category not found" });
    }

    return responseHandler(res, 200, updatedCategory);
  } catch (err) {
    console.error(err); // Log the error for debugging
    responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
