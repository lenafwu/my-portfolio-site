const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// helper function for guard purposes
function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/users/login");
  }
  next();
}

// get contact list
router.get("/list", contactController.getContactList);

// edit contact detail
router.get("/edit/:id", contactController.displayEditPage);
router.post("/edit/:id", contactController.processEditPage);

// delete contact
router.get("/delete/:id", contactController.performDelete);

// get route for displaying add contact page
router.get("/add", contactController.displayAddPage);
router.post("/add", contactController.processAddPage);

module.exports = router;
