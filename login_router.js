const express = require("express");

const {
  getLoginPage,
  getCreatePage,
  createUser,
  checkLogin,
} = require("./controller/login_controller");
const Router = express.Router();

Router.route("/").get(getLoginPage).post(checkLogin);
Router.route("/add").get(getCreatePage).post(createUser);
module.exports = Router;
