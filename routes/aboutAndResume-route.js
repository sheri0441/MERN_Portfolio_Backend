const express = require("express");
const pdfUpload = require("../middlewares/pdf-upload");

const updateAboutAndResumeHandler = require("../controllers/aboutAndResume-controller");

const router = express.Router();

router.patch("/", pdfUpload.single("resume"), updateAboutAndResumeHandler);

module.exports = router;
