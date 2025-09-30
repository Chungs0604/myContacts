const express = require("express");
const app = express();
const override = require("method-override");
const dbconnect = require("./config/db_connect");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(override("_method"));
dbconnect();

// app.use(require("./middleware/checklogin"));
app.use("/", require("./login_router"));
app.use("/contacts", require("./contacts_router"));

app.listen(3000, () => {
  console.log("3000 port is starting");
});
