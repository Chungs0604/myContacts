const mongoose = require("mongoose");
const asynchandler = require("express-async-handler");
require("dotenv").config();

const dbconnect = asynchandler(async (req, res) => {
  await mongoose.connect(process.env.DB_connect);
  console.log("DB connected");
});

module.exports = dbconnect;
