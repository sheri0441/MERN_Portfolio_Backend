const mailRoute = require("./routes/mail-route");
const userRoute = require("./routes/user-route");
const projectRoute = require("./routes/project-route");
const aboutAndResumeHandler = require("./routes/aboutAndResume-route");
const dataRoute = require("./routes/data-route");
const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");

const app = express();

app.use(express.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE");

  next();
});

app.use("/api/mail", mailRoute);

app.use("/api/data", dataRoute);

app.use("/api/data/user", userRoute);

app.use("/api/data/project", projectRoute);

app.use("/api/data/about&resume", aboutAndResumeHandler);

app.use((req, res, nex) => {
  const error = new HttpError("Route not found", 404);
  throw error;
});

app.use((err, req, res, nex) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return nex(err);
  }
  res.status(err.code || 500);
  res.json({ message: err.message || "An unknown err occurred" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@bookstore.mubs3rs.mongodb.net/${process.env.DB_database}?retryWrites=true&w=majority`
  )
  .then(() => app.listen(process.env.PORT))
  .catch((err) => console.log(err));
