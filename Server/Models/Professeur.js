const mongoose = require("mongoose");
require("dotenv").config();
const Departement = require("./Departement");

const professeurSchema = new mongoose.Schema({
  CIN: {
    type: String,
    unique: true,
    required: true,
  },
  PhoneNumber: {
    type: String,
    unique: true,
  },
  FullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  id_departement: {
    type: mongoose.Types.ObjectId,
    ref: "departements",
  },
});

const Professeur = mongoose.model("Professeur", professeurSchema);



module.exports = Professeur;
