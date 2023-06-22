// this file defines business contact model
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  contactName: String,
  contactEmail: String,
  contactNumber: String,
});

module.exports = mongoose.model("Contact", contactSchema);
