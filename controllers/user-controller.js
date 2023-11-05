const nodeMailer = require("../models/Node-mailer");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const data = require("../models/data");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await data.findById(process.env.BD_ID);
  } catch (err) {
    const error = new HttpError("Something went wrong, try again", 500);
    return next(error);
  }

  if (user.email !== email) {
    const error = new HttpError("Invalid Credential, try again", 403);
    return next(error);
  }

  let isPasswordValid;

  try {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (err) {
    const error = new HttpError("Cloud not login, try again", 500);
    return next(error);
  }

  if (!isPasswordValid) {
    const error = new HttpError("Invalid credential, try again", 403);
    return next(error);
  }

  res.status(200).json({ message: "Logged in" });
};

const sendUpdateCode = async (req, res, next) => {
  let token;

  try {
    token = jwt.sign({ date: Date.now() }, process.env.Secret_Key, {
      expiresIn: "5min",
    });
  } catch (err) {
    const error = new HttpError("Error occurred in token.", 500);
    return next(error);
  }

  const name = "website";
  const email = "Sheharyarali689@gmail.com";
  const description = `This is your change password code: ${token}`;
  const subject = "code for your new password";

  try {
    await nodeMailer(name, email, description, subject);
  } catch {
    const error = new HttpError("Sending code fail", 400);
    return next(error);
  }

  res.status(200).json("Check your email");
};

const updatePassword = async (req, res, next) => {
  const { code, password } = req.body;

  try {
    jwt.verify(code, process.env.Secret_Key);
  } catch (err) {
    const error = new HttpError("something went wrong with code.", 500);
    return next(error);
  }

  let user;
  try {
    user = await data.findById(process.env.BD_ID);
  } catch (err) {
    const error = new HttpError("There is some issue in dataBase.", 500);
    return next(error);
  }

  user.password = await bcrypt.hash(password, 12);

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError("There is some issue in saving password.", 500);
    return next(error);
  }

  res.status(200).json({ message: "Your password changed" });
};

module.exports = {
  login,
  sendUpdateCode,
  updatePassword,
};
