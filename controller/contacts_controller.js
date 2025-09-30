const asynchandler = require("express-async-handler");
const DB_contact = require("../model/contactSchema");

// /contacts 모든 연락처 보여주기
const getAllContacts = asynchandler(async (req, res) => {
  const users = await DB_contact.find();
  res.render("index", { users: users });
});

// /contacts/add 연락처 추가하기 페이지
const getCreateContactPage = asynchandler(async (req, res) => {
  res.render("add");
});

// 연락처 추가

const createContact = asynchandler(async (req, res) => {
  const { name, email, phone } = req.body;
  console.log(req.body);
  if (!name || !email || !phone) {
    res.send("필수 항목이 빠졌습니다.");
  }
  await DB_contact.create({
    name,
    email,
    phone,
  });
  res.redirect("/contacts");
});

const getUpdatePage = asynchandler(async (req, res) => {
  const updateUser = await DB_contact.findById(req.params.id);
  res.render("update", { updateUser: updateUser });
});
const updateContact = asynchandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const updateContact = await DB_contact.findById(req.params.id);
  console.log(req.body);
  if (!name || !email || !phone) {
    res.send("필수 항목이 빠졌습니다.");
  } else {
    updateContact.name = name;
    updateContact.email = email;
    updateContact.phone = phone;
    await updateContact.save();
    res.redirect("/contacts");
  }
});

const deleteContact = asynchandler(async (req, res) => {
  const removeContact = await DB_contact.findByIdAndDelete(req.params.id);
  res.redirect("/contacts");
});
module.exports = {
  getAllContacts,
  getCreateContactPage,
  createContact,
  getUpdatePage,
  updateContact,
  deleteContact,
};
