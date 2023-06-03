var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" });
});

router.get("/about", function (req, res, next) {
  res.render("index", { title: "About" });
});

router.get("/project", function (req, res, next) {
  res.render("projects", projects);
});

const projects = {
  title: "Projects",
  projects: [
    {
      name: "Project 1",
      description: "This is the first project",
      link: "www.example.com",
    },
    {
      name: "Project 2",
      description: "This is the second project",
      link: "www.example.com",
    },
    {
      name: "Project 3",
      description: "This is the third project",
      link: "www.example.com",
    },
  ],
};

module.exports = router;
