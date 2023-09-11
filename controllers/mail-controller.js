const nodeMailer = require("../models/Node-mailer");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const mailHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("invalid input, validation fail.", 422);
    return next(error);
  }

  const { name, email, message } = req.body;

  const subject = "message from personal website";
  try {
    await nodeMailer(name, email, message, subject);
  } catch {
    const error = new HttpError("Sending Mail failed, please try again", 417);
    return next(error);
  }
  res.status(200).json("message send successfully");
};

module.exports = mailHandler;
