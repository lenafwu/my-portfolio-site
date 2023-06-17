const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user");

module.exports = function () {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await UserModel.findOne({ username });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      if (!user.authenticate(password)) {
        return done(null, false, { message: "Invalid password" });
      }

      user.password = "";
      user.salt = "";
      console.log("user.findOne");
      return done(null, user);
    })
  );
};
