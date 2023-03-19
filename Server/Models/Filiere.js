const mongoose = require("mongoose");
const Option = require("./Option");
require("dotenv").config();
 

const filiereSchema = new mongoose.Schema({
  Nom: {
    type: String,
    unique: true,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Date_Creation: {
    type: Date,
    required: true
  },
  Effectif: {
    type: Number,
    required: true
  },
  id_coordinateur: {type:mongoose.Types.ObjectId,
    ref:"professeurs",
    required:true},
  id_departement: {
    type: mongoose.Types.ObjectId,
    ref: "departements",
    required: true,},
  Options: [Option],
});

const Filiere = mongoose.model("Filiere", filiereSchema);
module.exports = Filiere;


