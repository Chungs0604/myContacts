const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");

require("dotenv").config();
const jwt_secret = process.env.JWT_secret;

const checkLogin = asynchandler(async (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

  const token = req.cookies.tok;

  if (!token) {
    return res.render("home");
  } else {
    const decoded = jwt.verify(token, jwt_secret);
    req.username = decoded.username;
    next();
  }
});
module.exports = checkLogin;
