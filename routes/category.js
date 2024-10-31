const express = require("express");
const router = express.Router();
const {
  categoryDataValidate,
} = require("../utils/validations/category.validation");
const { categoryController } = require("../controllers");
const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = categoryController;

router.get("/", getCategories);
router.get("/:id", getCategory);
router.delete("/:id", deleteCategory);
router.post("/", categoryDataValidate, createCategory);
router.put("/:id", categoryDataValidate, updateCategory);

module.exports = router;
