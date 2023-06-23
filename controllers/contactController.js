// this file defines CRUD operations for business contacts

const ContactModel = require("../models/contactModel");

module.exports.getContactList = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find();
    res.render("contacts/list", {
      title: "Contact List",
      contacts: contacts,
      userName: req.user ? req.user.username : "",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.displayEditPage = async (req, res, next) => {
  try {
    const contact = await ContactModel.findById(req.params.id);
    res.render("contacts/add_edit", {
      title: "Edit Contact",
      userName: req.user ? req.user.username : "",
      contact: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.processEditPage = async (req, res, next) => {
  try {
    const { id, contactName, contactEmail, contactNumber } = req.body;

    const contactToUpdate = await ContactModel.findByIdAndUpdate(id, {
      contactName,
      contactEmail,
      contactNumber,
    });

    if (!contactToUpdate) {
      console.log("Contact not found");
      return res.redirect("/contacts/list");
    }
    res.redirect("/contacts/list");
  } catch (error) {
    next(error);
  }
};

module.exports.performDelete = async (req, res, next) => {
  try {
    let id = req.params.id;
    const deletedContact = await ContactModel.findByIdAndDelete(id);
    res.redirect("/contacts/list");
  } catch (error) {
    next(error);
  }
};

module.exports.displayAddPage = async (req, res, next) => {
  res.render("contacts/add_edit", {
    title: "Add New Contact",
    userName: req.user ? req.user.username : "",
    contact: null,
  });
};

module.exports.processAddPage = async (req, res, next) => {
  let newContact = new ContactModel(req.body);
  try {
    const savedContact = await newContact.save();
    res.redirect("/contacts/list");
  } catch (error) {
    next(error);
  }
};
