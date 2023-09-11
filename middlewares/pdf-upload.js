const multer = require("multer");

const pdfUpload = multer({
  limits: 50000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, "Shehayar_Resume.pdf");
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = file.mimetype === "application/pdf" ? true : false;
    const error = isValid ? null : new Error("Issue with mimetype");
    cb(error, true);
  },
});

module.exports = pdfUpload;
