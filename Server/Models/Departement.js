const mongoose = require("mongoose");

require("dotenv").config();

const DepartementSchema = new mongoose.Schema({
  Nom: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Date_Creation: { type: Date, required: true },
  id_Chef: {
    type: String,
  },
  professeurs: [{ type: mongoose.Types.ObjectId, ref: "professeurs" }],
});
const Departement = mongoose.model("departement", DepartementSchema);

module.exports = Departement;
