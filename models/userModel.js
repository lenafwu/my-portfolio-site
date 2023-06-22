// this file defines the user model

const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    username: {
      type: String,
      unique: true,
      required: "Username is required",
      trim: true,
    },
    password: {
      type: String,
      validate: [
        (password) => password && password.length > 6,
        "Password should be longer",
      ],
    },
    salt: {
      type: String,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

userSchema
  .virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (fullName) {
    const splitName = fullName.split(" ");
    this.firstName = splitName[0] || "";
    this.lastName = splitName[1] || "";
  });

// encrypt password
userSchema.methods.hashPassword = function (password) {
  return crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("base64");
};

// generate salt before user is saved
// * Pre middleware functions are executed one after another, when each middleware calls next
userSchema.pre("save", function (next) {
  if (this.password) {
    this.salt = crypto.randomBytes(16).toString("base64");
    this.password = this.hashPassword(this.password);
  }
  next();
});

// compare password with the hashed password
userSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

module.exports = mongoose.model("User", userSchema);
