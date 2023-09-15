const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3 = require("../models/s3client");

const deleteImage = async (key) => {
  const bucketParams = { Bucket: process.env.AWS_BUCKET, Key: key };
  try {
    await s3.send(new DeleteObjectCommand(bucketParams));
    return;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = deleteImage;
