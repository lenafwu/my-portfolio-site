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
router.get("/list", requireAuth, contactController.getContactList);

// edit contact detail
router.get("/edit/:id", requireAuth, contactController.displayEditPage);
router.post("/edit/:id", requireAuth, contactController.processEditPage);

// delete contact
router.get("/delete/:id", requireAuth, contactController.performDelete);

// get route for displaying add contact page
router.get("/add", requireAuth, contactController.displayAddPage);
router.post("/add", requireAuth, contactController.processAddPage);

module.exports = router;
