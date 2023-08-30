const express = require("express");
const passport = require("passport");
const isloggedin = require("../middleware/isloggedin");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller.js");

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/", usercontroller.register);

router.get("/login", usercontroller.getlogin);

router
  .route("/login")
  .get(usercontroller.getlogin)
  .post(
    passport.authenticate("local", {
      failureRedirect: "users/login",
      failureFlash: false,
      keepSessionInfo: true,
    }),
    (req, res) => {
      // const URL = req.session.returnto;
      res.redirect("/dashboard");
    }
  );

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "users/login",
//     failureFlash: false,
//     keepSessionInfo: true,
//   }),
//   (req, res) => {
//     // const URL = req.session.returnto;
//     res.redirect("/dashboard");
//   }
// );

router.get("/logout", isloggedin, usercontroller.logout);

module.exports = router;
