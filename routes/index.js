var express = require("express");
var router = express.Router();

// general router for portfolio part

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

module.exports = router;
