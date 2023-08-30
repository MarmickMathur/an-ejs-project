const catchasync = require("../utils/catchasync");
const User = require("../models/users");

module.exports.register = catchasync(async (req, res) => {
  const { username, password } = req.body;
  const user = new User({
    username,
  });
  const resp = await User.register(user, password);
  req.login(resp, (err) => {
    if (err) {
      next(err);
    }
    res.redirect("/dashboard");
  });
});

module.exports.getlogin = (req, res) => {
  if (req.user) {
    return res.redirect("/dashboard");
  }
  res.render("users/login");
};

module.exports.logout = (req, res, next) => {
  req.logout(req.user, (err) => {
    if (err) {
      next(err);
    }
    res.send("logged out");
  });
};
