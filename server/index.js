const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
const app = express();

const Account = require("./routes/api/Account");

const uri =
  "mongodb+srv://booktoface:Booktoface12@booktofacecluster.tre7r7o.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(error);
  }
}

connect();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send({ working: "Working..." }));
app.use("/api/account", Account);

app.listen(3001, () => {
  console.log("Server started on port 3001.");
});
