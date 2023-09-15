const data = require("../models/data");

const updateAboutAndResumeHandler = async (req, res, next) => {
  const { about } = req.body;

  let singleData;
  try {
    singleData = await data.findById(process.env.BD_ID);
  } catch (err) {
    console.log(err);
  }

  singleData.about = about;
  if (req.file) {
    singleData.resume = req.file.key;
  }

  try {
    await singleData.save();
  } catch (err) {
    console.log(err);
  }

  res.json({
    message: "Your about and resume updated.",
  });
};

module.exports = updateAboutAndResumeHandler;
