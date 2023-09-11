const mongoose = require("mongoose");
const mongooseValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    about: { type: String, required: true },
    resume: { type: String, required: true },
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        links: {
          github: { type: String },
          live: { type: String, required: true },
        },
      },
    ],
  }
  // { toJSON: { getters: true } }
);

dataSchema.plugin(mongooseValidator);

module.exports = mongoose.model("data", dataSchema);
