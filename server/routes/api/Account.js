const express = require("express");
const router = express.Router();

const Account = require("../../schemas/Account");

router.get("/test", (req, res) => {
  console.log("Hit at http://localhost:3001/api/account/test");
  res.json({
    msg: "This is the Account route.",
  });
});

router.get("/login/:email", (req, res) => {
  let email = req.params.email;
  console.log(`Hit at http://localhost:3001/api/account/login/${email}`);
  Account.findOne({ email: email })
    .then((acc) => {
      res.json(acc);
    })
    .catch((err) =>
      res
        .status(404)
        .json({ account_not_found: "No account found with that email" })
    );
});

router.get("/allAccounts", (req, res) => {
  console.log("Hit at http://localhost:3001/api/account/allAccounts");
  Account.find()
    .then((acc) => res.json(acc))
    .catch((err) => res.status(404).json({ account_not_found: "No accounts" }));
});

router.post("/signup", (req, res) => {
  console.log("Hit at http://localhost:3001/api/account/signup");

  const newAccount = new Account({
    id: req.body.id,
    email: req.body.email,
    password: req.body.password,
  });

  newAccount.save().then((newAcc) => res.json(newAcc));
});

router.delete("/delete", (req, res) => {
  console.log("Hit at http://localhost:3001/api/account/delete");
  let email = req.body.email;
  let password = req.body.password;
  Account.findOneAndRemove({ email: email, password: password }).exec();
});

module.exports = router;
