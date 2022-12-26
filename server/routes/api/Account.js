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

router.get("/login/:login", (req, res) => {
  const { login } = req.params;

  console.log(`Hit at http://localhost:3001/api/account/login/${login}`);
  Account.findOne({ login: login })
    .then((acc) => {
      return res.json(acc);
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ account_not_found: "No account found with that login" });
    });
});

router.post("/signup", (req, res) => {
  const { login, password } = req.body;

  console.log("Hit at http://localhost:3001/api/account/signup");

  const newAccount = new Account({
    login: login,
    password: password,
  });

  Account.exists({ login: login }, (err, doc) => {
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
  const { login, password } = req.body;

  console.log("Hit at http://localhost:3001/api/account/delete");

  Account.exists({ login: login, password: password }, (err, doc) => {
    if (doc) {
      Account.findOneAndRemove({ login: login, password: password })
        .exec()
        .then((result) => {
          return res.json(result);
        });
    } else {
      return res.json({ success: false });
    }
  });
});

module.exports = router;
