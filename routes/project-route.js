const express = require("express");
const projectController = require("../controllers/project-controller");

const imageUpload = require("../middlewares/image-upload");

const router = express.Router();

const { updateProject, deleteProject, addProject } = projectController;

router.post("/", imageUpload.single("image"), addProject);

router.delete("/:pid", deleteProject);

router.patch("/:pid", imageUpload.single("image"), updateProject);

module.exports = router;
