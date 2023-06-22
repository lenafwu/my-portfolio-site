var express = require("express");
var router = express.Router();

// general router for portofolio part

router.get(["/", "/:page"], (req, res, next) => {
  const page = req.params.page || "index";
  let contentPage;
  let title;

  switch (page) {
    case "about":
      title = "About Me";
      contentPage = "partials/home/about";
      break;
    case "project":
      title = "My Projects";
      contentPage = "partials/home/project";
      break;
    case "service":
      title = "Services";
      contentPage = "partials/home/service";
      break;
    case "contact":
      title = "Contact Me";
      contentPage = "partials/home/contact";
      break;
    default:
      title = "Home";
      contentPage = "partials/home/home";
      break;
  }

  res.render("index", { title: title, contentPage: contentPage });
});
// routers

/*
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home", contentPage: "partials/home/home" });
});

router.get("/about", function (req, res, next) {
  res.render("index", {
    title: "About Me",
    contentPage: "partials/home/about",
  });
});
*/
router.get("/project", function (req, res, next) {
  res.render("project", { title: "My Projects" });
});

router.get("/service", function (req, res, next) {
  res.render("service", { title: "Services" });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact Me" });
});

module.exports = router;
