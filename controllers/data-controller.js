const data = require("../models/data");
const HttpError = require("../models/http-error");

const getData = async (req, res, next) => {
  let completeData;

  try {
    completeData = await data.findById(process.env.BD_ID);
  } catch {
    const error = new HttpError("There is some issue in your database.", 500);
    next(error);
  }

  res.status(200).json({
    about: completeData.about,
    projectList: completeData.projects,
    resume: completeData.resume,
  });
};

module.exports = getData;
