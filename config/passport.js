const passport = require("passport");
const userModel = require("../models/userModel");

module.exports = function () {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findOne({ _id: id }, "-password -salt");
      return done(null, user);
    } catch (error) {
      done(error);
    }
  });

  require("./local")();
};
