const express = require("express");
const pdfUpload = require("../middlewares/pdf-upload");

const {
  updateAboutAndResumeHandler,
  downloadPDF,
} = require("../controllers/aboutAndResume-controller");

const router = express.Router();

router.patch("/", pdfUpload.single("resume"), updateAboutAndResumeHandler);
router.get("/", downloadPDF);

module.exports = router;
