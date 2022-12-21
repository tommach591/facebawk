const express = require("express");
const router = express.Router();

const Account = require("../../schemas/Account");

router.get("/allAccounts", (req, res) => {
  console.log("Hit at http://localhost:3001/api/account/allAccounts");
  Account.find()
    .then((acc) => {
      return res.json(acc);
    })
    .catch((err) => {
      return res.status(404).json({ account_not_found: "No accounts" });
    });
});

router.get("/login/:email", (req, res) => {
  const { email } = req.params;

  console.log(`Hit at http://localhost:3001/api/account/login/${email}`);
  Account.findOne({ email: email })
    .then((acc) => {
      return res.json(acc);
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ account_not_found: "No account found with that email" });
    });
});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  console.log("Hit at http://localhost:3001/api/account/signup");

  const newAccount = new Account({
    email: email,
    password: password,
  });

  Account.exists({ email: email }, (err, doc) => {
    if (doc) {
      return res.json({ success: false });
    } else {
      newAccount.save().then((acc) => {
        return res.json(acc);
      });
    }
  });
});

router.delete("/delete", (req, res) => {
  const { email, password } = req.body;

  console.log("Hit at http://localhost:3001/api/account/delete");

  Account.exists({ email: email, password: password }, (err, doc) => {
    if (doc) {
      Account.findOneAndRemove({ email: email, password: password }).exec();
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

module.exports = router;
