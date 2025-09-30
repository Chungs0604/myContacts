const express = require("express");
const Router = express.Router();

const checktoken = require("./middleware/checklogin");

const {
  getAllContacts,
  getCreateContactPage,
  createContact,
  getUpdatePage,
  updateContact,
  deleteContact,
} = require("./controller/contacts_controller");

// /contacts 경로
Router.route("/").get(checktoken, getAllContacts);

Router.route("/add").get(getCreateContactPage).post(createContact);
Router.route("/:id")
  .get(getUpdatePage)
  .put(updateContact)
  .delete(deleteContact);
module.exports = Router;
