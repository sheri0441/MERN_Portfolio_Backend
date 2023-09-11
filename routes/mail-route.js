const express = require("express");
const { check } = require("express-validator");

const mailHandler = require("../controllers/mail-controller");

const router = express.Router();

router.post(
  "/",
  check("name").isString().notEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("message").notEmpty().isString(),
  mailHandler
);

module.exports = router;
