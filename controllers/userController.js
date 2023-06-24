const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/userModel");

// helper function to protect routes
module.exports.requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.url = req.originalUrl;
    return res.redirect("/user/login");
  }
  next();
};

module.exports.renderLogin = (req, res, next) => {
  if (!req.user) {
    res.render("login", { title: "Log In" });
  } else {
    console.log(req.user);
    return res.redirect("/");
  }
};

module.exports.renderSignup = (req, res, next) => {
  if (!req.user) {
    /*
    // creates an empty new user object
    const newUser = new User();

    // renders the signup page and passes the newUser object to it*/
    res.render("signup", { title: "Sign Up" });
  } else {
    // if user is already logged in, redirect to home page
    return res.redirect("/");
  }
};

module.exports.signup = async (req, res, next) => {
  if (!req.user && req.body.password === req.body.confirmPassword) {
    console.log("===>", req.body);
    let user = new User(req.body);
    try {
      const savedUser = await user.save();
      req.login(savedUser, (err) => {
        if (err) return next(err);
        return res.redirect("/");
      });
    } catch (error) {
      console.log(error);
      return res.render("signup", { title: "Sign Up", user: user });
    }
  } else {
    return res.redirect("/");
  }
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.redirect("/");
  });
};

module.exports.login = (req, res, next) => {
  // if authentication successes, redirect to the url stored in session or to home page
  // otherwise, redirect to login page
  passport.authenticate("local", {
    successRedirect: req.session.url || "/",
    failureRedirect: "/users/login",
  })(req, res, next);

  // delete the url from session
  delete req.session.url;
};
