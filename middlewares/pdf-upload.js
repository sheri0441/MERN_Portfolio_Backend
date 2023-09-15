const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const s3 = require("../models/s3client");

const pdfUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    key: function (req, file, cb) {
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
