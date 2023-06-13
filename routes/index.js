var express = require("express");
var router = express.Router();

// routers
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "About Me" });
});

router.get("/project", function (req, res, next) {
  res.render("project", { title: "My Projects" });
});

router.get("/service", function (req, res, next) {
  res.render("service", { title: "Services" });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact Me" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});
module.exports = router;
