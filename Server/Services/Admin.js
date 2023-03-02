const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");

exports.getByEmail = async (email) => {
    return Admin.findOne({email: email});
}