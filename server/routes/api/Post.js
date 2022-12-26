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

router.get("/getChildren/:post_id", (req, res) => {
  const { post_id } = req.params;

  console.log(`Hit at http://localhost:3001/api/post/getChildren/${post_id}`);

  Post.find({ parent_id: post_id })
    .then((post) => {
      return res.json(post);
    })
    .catch((err) => {
      return res.status(404).json({ posts_not_found: "No posts" });
    });
});

router.post("/post", (req, res) => {
  console.log("Hit at http://localhost:3001/api/post/post");
  const { user_id, content, date_created } = req.body;

  const newPost = new Post({
    user_id: user_id,
    type: "post",
    content: content,
    date_created: date_created,
    attachment: "",
    likes: [],
  });

  newPost.save().then((post) => {
    return res.json(post);
  });
});

router.post("/child", (req, res) => {
  console.log("Hit at http://localhost:3001/api/post/child");
  const { user_id, parent_id, content, date_created } = req.body;

  const newPost = new Post({
    user_id: user_id,
    parent_id: parent_id,
    type: "child",
    content: content,
    date_created: date_created,
    attachment: "",
    likes: [],
  });

  newPost.save().then((post) => {
    return res.json(post);
  });
});

router.post("/reply", (req, res) => {
  console.log("Hit at http://localhost:3001/api/post/reply");
  const { user_id, parent_id, content } = req.body;

  const newPost = new Post({
    user_id: user_id,
    parent_id: parent_id,
    type: "reply",
    content: content,
    date_created: new Date(Date.now()),
    attachment: "",
    replies: [],
    likes: [],
  });

  newPost.save().then((post) => {
    return res.json(post);
  });
});

router.post("/like", (req, res) => {
  console.log("Hit at http://localhost:3001/api/post/like");
  const { post_id, user_id } = req.body;

  Post.findOneAndUpdate(
    { _id: post_id },
    {
      $push: { likes: user_id },
    }
  )
    .exec()
    .then((result) => res.json(result));
});

router.post("/unlike", (req, res) => {
  console.log("Hit at http://localhost:3001/api/post/unlike");
  const { post_id, user_id } = req.body;

  Post.findOneAndUpdate(
    { _id: post_id },
    {
      $pull: { likes: user_id },
    }
  )
    .exec()
    .then((result) => res.json(result));
});

router.delete("/delete", (req, res) => {
  console.log("Hit at http://localhost:3001/api/post/delete");
  const { post_id } = req.body;

  Post.findOneAndDelete({ _id: post_id }).exec();
  Post.find({ parent_id: post_id }).then((result) => {
    result.forEach((comment) => {
      Post.deleteMany({ parent_id: comment._id }).exec();
      Post.findOneAndDelete({ _id: comment._id }).exec();
    });
  });
  return res.json({ success: true });
});

router.delete("/deleteByUser", (req, res) => {
  console.log("Hit at http://localhost:3001/api/post/deleteByUser");
  const { user_id } = req.body;

  Post.find({ user_id: user_id }).then((allPosts) => {
    allPosts.forEach((post) => {
      Post.find({ user_id: user_id }).then((allComments) => {
        allComments.forEach((comment) => {
          Post.deleteMany({ parent_id: comment._id }).exec();
          Post.findOneAndDelete({ _id: comment._id }).exec();
        });
      });
      Post.findOneAndDelete({ _id: post._id }).exec();
    });
  });

  return res.json({ success: true });
});

router.delete("/deleteAll", (req, res) => {
  console.log("Hit at http://localhost:3001/api/post/deleteAll");

  Post.deleteMany({}).exec();
  return res.json({ success: true });
});

module.exports = router;
