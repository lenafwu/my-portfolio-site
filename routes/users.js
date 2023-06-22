var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

// routes for sign up
router.get("/signup", userController.renderSignup);

router.post("/signup", userController.signup);

// routes for log in
router.get("/login", userController.renderLogin);

router.post("/login", userController.login);

module.exports = router;
