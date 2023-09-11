const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const isValid = (req, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("invalid input, validation fail.", 422);
    console.log("hello from inside");
    console.log(next(error));
    return next(error);
  }
};

module.exports = isValid;
