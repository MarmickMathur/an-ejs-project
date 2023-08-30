module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.session.returnto = req.originalUrl;
    res.redirect("/users/login");
  }
};
