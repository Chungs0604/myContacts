const asynchandler = require("express-async-handler");
const User = require("../model/loginSchema");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_secret;

//로그인 화면 보여주기
const getLoginPage = asynchandler(async (req, res) => {
  res.render("home");
});
//로그인 확인
const checkLogin = asynchandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.send("해당 회원은 없습니다. 다시 입력해주세요.");
  }
  const correct = await bcrypt.compare(password, user.password);
  if (!correct) {
    return res.send("비밀번호를 확인해주세요");
  }

  const token = jwt.sign({ id: user._id, username: user.username }, jwt_secret);
  res.cookie("tok", token, { httpOnly: true });

  res.redirect("/contacts");
});
//사용자 등록 화면 보여주기
const getCreatePage = asynchandler(async (req, res) => {
  res.render("register");
});
//사용자 등록
const createUser = asynchandler(async (req, res) => {
  const { username, password, password2 } = req.body;
  if (!username || !password) {
    res.send("아이디와 비밀번호는 필수입니다.");
  } else if (password != password2) {
    res.send("비밀번호를 확인해주세요");
  } else {
    await User.create({
      username,
      password: await bcrypt.hash(password, 10),
    });
    res.redirect("/");
  }
});

module.exports = { getLoginPage, getCreatePage, createUser, checkLogin };
