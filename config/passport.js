const passport = require("passport");
const userModel = require("../models/userModel");

module.exports = function () {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
