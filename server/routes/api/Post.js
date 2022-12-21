const express = require("express");
const router = express.Router();

const Post = require("../../schemas/Post");
const Profile = require("../../schemas/Profile");

router.get("/allPosts", (req, res) => {
  console.log(`Hit at http://localhost:3001/api/post/allPosts`);
  Post.find()
    .then((acc) => res.json(acc))
    .catch((err) => res.status(404).json({ profile_not_found: "No profiles" }));
});

router.get("/get/:post_id", (req, res) => {
  const { post_id } = req.params;
  console.log(`Hit at http://localhost:3001/api/post/get/${post_id}`);
  Post.findOne({ _id: post_id })
    .then((post) => {
      return res.json(post);
    })
    .catch((err) => {
      return res.status(404).json({ posts_not_found: "No posts" });
    });
});

router.get("/getPostByUser/:user_id", (req, res) => {
  const { user_id } = req.params;
  console.log(`Hit at http://localhost:3001/api/post/getPostByUser/${user_id}`);
  Post.find({ user_id: user_id, type: "post" })
    .then((post) => {
      return res.json(post);
    })
    .catch((err) => {
      return res.status(404).json({ posts_not_found: "No posts" });
    });
});

router.get("/newsfeed/:user_id", (req, res) => {
  const { user_id } = req.params;

  console.log(`Hit at http://localhost:3001/api/post/newsfeed/${user_id}`);

  Profile.findOne({ user_id: user_id })
    .then((prof) => {
      let relevant_users = prof.friends;
      relevant_users.push(prof.user_id);

      Post.find({ user_id: { $in: relevant_users }, type: "post" })
        .then((post) => {
          return res.json(post);
        })
        .catch((err) => {
          return res.status(404).json({ posts_not_found: "No posts" });
        });
    })
    .catch((err) => {
      return res.status(404).json({ profile_not_found: "No profiles" });
    });
});

router.post("/post", (req, res) => {
  console.log("Hit at http://localhost:3001/api/post/post");

  const newPost = new Post({
    user_id: req.body.user_id,
    type: "post",
    content: req.body.content,
    date_created: new Date(Date.now()),
    attachment: "",
    replies: [],
    likes: [],
    shares: [],
  });

  newPost.save().then((post) => {
    return res.json(post);
  });
});

router.delete("/delete", (req, res) => {
  console.log("Hit at http://localhost:3001/api/post/delete");
  let post_id = req.body.post_id;

  Profile.findOneAndRemove({ _id: post_id }).exec();
  return res.json({ success: true });
});

router.delete("/deleteAll", (req, res) => {
  console.log("Hit at http://localhost:3001/api/post/deleteAll");

  Post.deleteMany({}).exec();
  return res.json({ success: true });
});

module.exports = router;
