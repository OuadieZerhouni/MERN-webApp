const mongoose = require("mongoose");

require("dotenv").config();

const AdminSchema = new mongoose.Schema({
    Email: {
        type: String,
        unique: true,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    }
});

const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
