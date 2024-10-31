const bcrypt = require("bcrypt");
const generator = require("generate-password");
const { sendEmail, responseHandler } = require("../utils/helpers");
const { validationResult } = require("express-validator");
const { createToken } = require("../middlewares/authorization");
const { MESSAGES, WELCOME_EMAIL } = require("../utils/constants");
const renderWelcomeEmail = require("../utils/templates/emailTemplate");
const User = require("../models/userModel"); // Import your Mongoose User model

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHandler(res, 400, {
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Use Mongoose method

    if (!user) {
      return responseHandler(res, 401, {
        message: MESSAGES.INCORRECT_EMAIL_OR_PASSWORD,
      });
    }

    const validatePassword = bcrypt.compareSync(password, user.password);

    if (validatePassword) {
      return responseHandler(res, 200, {
        access_token: await createToken(user),
      });
    } else {
      return responseHandler(res, 401, {
        message: MESSAGES.INCORRECT_EMAIL_OR_PASSWORD,
      });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHandler(res, 400, {
        success: false,
        errors: errors.array(),
      });
    }

    const { email } = req.body;

    // Generate a random password
    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user with Mongoose
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Send welcome email
    await sendEmail(
      email,
      WELCOME_EMAIL.SUBJECT,
      renderWelcomeEmail(`${process.env.FRONT_END}/login`, password)
    );

    return responseHandler(res, 200, { message: MESSAGES.EMAIL_SENT });
  } catch (err) {
    console.error(err); // Log the error for debugging
    responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  login,
  signup,
};
