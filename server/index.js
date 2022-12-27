const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const Account = require("./routes/api/Account");
const Profile = require("./routes/api/Profile");
const Post = require("./routes/api/Post");

const uri = `mongodb+srv://booktoface:${process.env.MONGODB_PASSWORD}@booktofacecluster.tre7r7o.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

connect();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send({ working: "Working..." }));
app.use("/api/account", Account);
app.use("/api/profile", Profile);
app.use("/api/post", Post);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server started.`);
});
