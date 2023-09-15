const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const s3 = require("../models/s3client");

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const imageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    contentType: function (req, file, cb) {
      cb(null, file.mimetype);
    },

    key: function (req, file, cb) {
      const ext = MIME_TYPE[file.mimetype];
      cb(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE[file.mimetype];
    const error = isValid ? null : new Error("Issue with mimetype");
    cb(error, true);
  },
});

module.exports = imageUpload;
