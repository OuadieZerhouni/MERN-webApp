const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getByEmail = async function (email) {
  try {
    return Admin.find({ email: email });
  } catch (err) {
    console.log(err);
  }
};

exports.insert = async function (admin) {
  try {
    //Hash the password
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    admin.password = hashedPassword;
    return Admin.create(admin);
  } catch (err) {
    console.log(err);
  }
};

exports.update = async function (id, admin) {
  try {
    return Admin.findByIdAndUpdate(id, admin);
  } catch (err) {
    console.log(err);
  }
};

exports.remove = async function (id) {
  try {
    return Admin.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
};

exports.getAll = async function () {
  try {
    return Admin.find({});
  } catch (err) {
    console.log(err);
  }
};

exports.getById = async function (id) {
  try {
    return Admin.findById(id);
  } catch (err) {
    console.log(err);
  }
};




