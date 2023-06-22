const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user");

module.exports = function () {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username: username });

        // if user not found
        if (!user) {
          return done(null, false, {
            message: "Unknown user",
          });
        }

        // if password is wrong
        if (!user.authenticate(password)) {
          return done(null, false, {
            message: "Invalid password",
          });
        }

        // if credentials are correct, return the user object
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};
