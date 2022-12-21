const express = require("express");
const router = express.Router();

const Profile = require("../../schemas/Profile");

router.get("/allProfiles", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/allProfiles");
  Profile.find()
    .then((prof) => res.json(prof))
    .catch((err) => res.status(404).json({ profile_not_found: "No profiles" }));
});

router.get("/get/:user_id", (req, res) => {
  const { user_id } = req.params;

  console.log(`Hit at http://localhost:3001/api/profile/get/${user_id}`);
  Profile.findOne({ user_id: user_id })
    .then((prof) => {
      return res.json(prof);
    })
    .catch((err) => {
      return res.status(404).json({ profile_not_found: "No profiles" });
    });
});

router.post("/signup", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/signup");
  const { user_id, email, first, last, birthdate, gender } = req.body;

  const newProfile = new Profile({
    user_id: user_id,
    email: email,
    first: first,
    last: last,
    birthdate: birthdate,
    gender: gender,
    date_created: new Date(Date.now()),
    friends: [],
    pfp: "",
    banner: "",
    bio: "",
    work: "",
    education: "",
    city: "",
    hometown: "",
    relationship: "",
    name_pronunciation: "",
    photos: [],
    posts_made: [],
    posts_liked: [],
    posts_shared: [],
  });

  newProfile.save().then((prof) => {
    return res.json(prof);
  });
});

router.post("/update/friends", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/friends");
  const { user_id, new_friend } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $push: { friends: new_friend } }
  ).exec();
});

router.post("/update/pfp", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/pfp");
  const { user_id, new_pfp } = req.body;

  Profile.findOneAndUpdate({ user_id: user_id }, { pfp: new_pfp }).exec();
});

router.post("/update/banner", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/banner");
  const { user_id, new_banner } = req.body;

  Profile.findOneAndUpdate({ user_id: user_id }, { banner: new_banner }).exec();
});

router.post("/update/bio", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/bio");
  const { user_id, new_bio } = req.body;

  Profile.findOneAndUpdate({ user_id: user_id }, { bio: new_bio }).exec();
});

router.post("/update/work", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/work");
  const { user_id, new_work } = req.body;

  Profile.findOneAndUpdate({ user_id: user_id }, { work: new_work }).exec();
});

router.post("/update/education", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/education");
  const { user_id, new_education } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { education: new_education }
  ).exec();
});

router.post("/update/city", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/city");
  const { user_id, new_city } = req.body;

  Profile.findOneAndUpdate({ user_id: user_id }, { city: new_city }).exec();
});

router.post("/update/hometown", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/hometown");
  const { user_id, new_hometown } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { hometown: new_hometown }
  ).exec();
});

router.post("/update/relationship", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/relationship");
  const { user_id, new_relationship } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { relationship: new_relationship }
  ).exec();
});

router.post("/update/name_pronunciation", (req, res) => {
  console.log(
    "Hit at http://localhost:3001/api/profile/update/name_pronunciation"
  );
  const { user_id, new_name_pronunciation } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { name_pronunciation: new_name_pronunciation }
  ).exec();
});

router.post("/update/photos", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/photos");
  const { user_id, new_photo } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $push: { photos: new_photo } }
  ).exec();
});

router.post("/update/posts_made", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/posts_made");
  const { user_id, new_post } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $push: { posts_made: new_post } }
  ).exec();
});

router.post("/update/posts_liked", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/posts_liked");
  const { user_id, new_post_liked } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $push: { posts_liked: new_post_liked } }
  ).exec();
});

router.post("/update/posts_shared", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/posts_shared");
  const { user_id, new_post_shared } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $push: { posts_shared: new_post_shared } }
  ).exec();
});

router.delete("/delete", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/delete");
  const { email } = req.body;

  Profile.findOneAndRemove({ email: email }).exec();
  return res.json({ success: true });
});

module.exports = router;
