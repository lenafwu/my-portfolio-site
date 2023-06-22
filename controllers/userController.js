const mongoose = require("mongoose");
const passport = require("passport");
const user = require("../models/userModel");

// helper function to protect routes
module.exports.requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.url = req.originalUrl;
    return res.redirect("/user/login");
  }
  next();
};

module.exports.renderSignin = (req, res) => {
  res.render("signin");
};

module.exports.signin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: req.session.url || "/",
    failureRedirect: "/user/login",
  })(req, res, next);

  delete req.session.url;
};

module.exports.signout = (req, res) => {
  req.logout();
  res.redirect("/");
};
