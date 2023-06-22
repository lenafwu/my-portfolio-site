var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Sign Up" });
});

router.post("/login", userController.requireAuth, userController.signin);

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Log In" });
});
module.exports = router;
