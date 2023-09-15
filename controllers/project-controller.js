const HttpError = require("../models/http-error");
const data = require("../models/data");
const deleteImage = require("../models/s3-delete-image");

const addProject = async (req, res, next) => {
  const { title, live, github, description } = req.body;
  const image = req.file;
  if (!image) {
    res.status(400).json({ message: "please add image" });
    return;
  }

  let singleData;
  try {
    singleData = await data.findById(process.env.BD_ID);
  } catch {
    const error = new HttpError("There is some issue in database.", 500);
    next(error);
  }

  const newProject = {
    title,
    description,
    links: {
      live: live,
      github: github,
    },
    imageUrl: image.key,
  };

  singleData.projects.unshift(newProject);

  try {
    singleData.save();
  } catch {
    const error = new HttpError(
      "Project cloud not save in database, please try again.",
      500
    );
    next(error);
  }

  res.status(200).json({
    message: "Project added",
    project: singleData.projects[0],
  });
};

const deleteProject = async (req, res, next) => {
  const projectId = req.params.pid;

  let singleData;

  try {
    singleData = await data.findById(process.env.BD_ID);
  } catch (err) {
    console.log(err);
  }

  let findProject = singleData.projects.find(
    (project) => project._id.toString() === projectId
  );

  if (!findProject) {
    const error = new HttpError("project does not exist.", 404);
    next(error);
  }

  await deleteImage(findProject.imageUrl);

  let projectIndex = await singleData.projects.indexOf(findProject);

  await singleData.projects.splice(projectIndex, 1);
  try {
    await singleData.save();
  } catch (err) {
    const error = new HttpError("Fail to save change in Database", 500);
    next(error);
  }

  res.status(200).json({ message: "Project deleted" });
};

const updateProject = async (req, res, next) => {
  const projectId = req.params.pid;

  const { title, description, github, live } = req.body;

  let singleData;

  try {
    singleData = await data.findById(process.env.BD_ID);
  } catch (err) {
    console.log(err);
  }

  let project;
  try {
    project = singleData.projects.find(
      (project) => project._id.toString() === projectId
    );
  } catch (err) {
    console.log(err);
  }

  if (!project) {
    const error = new HttpError("This project not exists", 404);
    next(error);
  }

  project.title = title;
  project.description = description;
  project.links.github = github;
  project.links.live = live;
  if (!!req.file) {
    await deleteImage(project.imageUrl);

    project.imageUrl = req.file.key;
  }

  try {
    await singleData.save();
  } catch {
    const error = new HttpError("Update fail to save in Database", 500);
    next(error);
  }

  res.json({ message: "file update", project });
};

module.exports = {
  addProject,
  deleteProject,
  updateProject,
};
