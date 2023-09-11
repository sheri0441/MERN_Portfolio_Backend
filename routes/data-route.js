const express = require("express");

const getData = require("../controllers/data-controller");

const router = express.Router();

router.get("/", getData);

module.exports = router;
