const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    required: true,
  },
  friends: {
    type: Array,
    required: false,
  },
  pfp: {
    type: String,
    required: false,
  },
  photos: {
    type: Array,
    required: false,
  },
  posts_made: {
    type: Array,
    required: false,
  },
  posts_liked: {
    type: Array,
    required: false,
  },
  posts_shared: {
    type: Array,
    required: false,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
