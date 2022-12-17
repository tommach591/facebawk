const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  parent_id: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  attachment: {
    type: String,
    required: false,
  },
  replies: {
    type: Array,
    required: false,
  },
  likes: {
    type: Array,
    required: false,
  },
  shares: {
    type: Array,
    required: false,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
