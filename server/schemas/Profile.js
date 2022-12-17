const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
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
    default: new Date(Date.now()),
  },
  friends: {
    type: Array,
    default: [],
  },
  pfp: {
    type: String,
    required: false,
  },
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
  photos: {
    type: Array,
    default: [],
  },
  posts_made: {
    type: Array,
    default: [],
  },
  posts_liked: {
    type: Array,
    default: [],
  },
  posts_shared: {
    type: Array,
    default: [],
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
