const {
  loginDataValidate,
  signupDataValidate,
} = require("../utils/validations/auth.validation");
const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { login, signup } = authController;

router.post("/login", loginDataValidate, login);
router.post("/signup", signupDataValidate, signup);

module.exports = router;
