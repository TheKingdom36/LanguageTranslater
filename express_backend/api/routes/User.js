const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("username").not().isEmpty(),
  body("email")
    .isEmail()
    .notEmpty()
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
    
        if (user !== null) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
  body("password").not().isEmpty(),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status:"failed",errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);

    var hashedPassword = await bcrypt.hash(req.body.password, salt);

    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      salt: salt,
    });

    newUser.save();

    res.status(200).send({ status: "success" });
  }
);

router.post(
  "/login",
  express.urlencoded({ extended: false }),
  body("email").isEmail().notEmpty(),
  body("password").notEmpty(),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status:"failed",errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email });
    const hashedPassword = await bcrypt.hash(req.body.password, user.salt);


    if (hashedPassword !== user.password) {
      res.status(401).json({ status: "Provided password is incorrect" });
    }

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);

      // store user information in session, typically a user id
      req.session.user = user.id;

     

      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err);
        res.status(200).json({ status: "success" });
      });
    });
  }
);

router.get("/logout", function (req, res, next) {
  // logout logic

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.status(200).json({ success: "success" });
    });
  });
});

router.get("/", async function (req, res) {
  const user = await User.findOne({ _id: req.session.user });

  if (user === null || user === undefined) {
    res.status(404).json({ status: "user not found" });
  } else {
    console.log(user)
    const userResponseInfo = {
      username: user.username,
    };
    res.status(200).json(userResponseInfo);
  }
});

module.exports = router;
