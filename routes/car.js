const express = require("express");
const router = express.Router();
const { carController } = require("../controllers");
const { carDataValidate } = require("../utils/validations/car.validation");

const { createCar, getCars, getCar, deleteCar, updateCar, totalNumberofCars } =
  carController;

router.get("/", getCars);
router.get("/:id", getCar);
router.delete("/:id", deleteCar);
router.post("/", carDataValidate, createCar);
router.get("/total/count", totalNumberofCars);
router.put("/:id", carDataValidate, updateCar);

module.exports = router;
