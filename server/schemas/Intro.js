const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IntroSchema = new Schema({
  banner: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  work: {
    type: String,
    required: false,
  },
  education: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  hometown: {
    type: String,
    required: false,
  },
  relationship: {
    type: String,
    required: false,
  },
  name_pronunciation: {
    type: String,
    required: false,
  },
});

const Intro = mongoose.model("Intro", IntroSchema);

module.exports = Intro;
