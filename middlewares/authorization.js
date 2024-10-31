const env = require("dotenv");
const jwt = require("jsonwebtoken");
const { responseHandler } = require("../utils/helpers");
const { MESSAGES, PUBLIC_PATHS } = require("../utils/constants");
env.config();

const createToken = async ({ email, id }) => {
  return await jwt.sign({ email, id }, process.env.ADMIN_JWT_TOKEN_KEY);
};

const verifyToken = (req, res, next) => {
  try {
    if (PUBLIC_PATHS?.includes(req?.url)) {
      next();
    } else {
      let token = req?.headers?.["authorization"]?.split("Bearer ")?.[1];
      if (token) {
        const verified = jwt.verify(token, process.env.ADMIN_JWT_TOKEN_KEY);
        if (verified) {
          next();
        } else {
          return responseHandler(res, 401, {
            message: MESSAGES.UNAUTHORIZATION_ERROR,
          });
        }
      } else {
        return responseHandler(res, 401, {
          message: MESSAGES.UNAUTHORIZATION_ERROR,
        });
      }
    }
  } catch (err) {
    responseHandler(res, 401, { message: MESSAGES.ERROR_WHILE_AUTHORIZING });
  }
};

module.exports = {
  createToken,
  verifyToken,
};
