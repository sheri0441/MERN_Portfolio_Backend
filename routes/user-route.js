const express = require("express");

const userControllers = require("../controllers/user-controller");

const router = express.Router();

const { login, sendUpdateCode, updatePassword } = userControllers;

router.post("/login", login);

router.get("/update", sendUpdateCode);

router.patch("/update", updatePassword);

module.exports = router;
