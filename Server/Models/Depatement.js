const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const DepartementSchema = new mongoose.Schema({
  Nom: String,
  description: String,
  Date_Creation: Date,
  id_Chef: mongoose.Types.ObjectId,
  professeurs: [{ _id: mongoose.Types.ObjectId }],
  Filieres: [{ _id: mongoose.Types.ObjectId }],
});
const Departement = mongoose.model('Department', DepartementSchema);


class DepartementModel {
  static async getAll() {
    return await Departement.find({});
  }

  static async getById(id) {
    return await Departement.findById(id);
  }
  static async getByNom(nom) {
    return await Departement.find({ Nom: nom });
  }

  static async insert(departement) {
    return await new Departement(departement).save();
  }

  static async update(id, departement) {
    return await Departement.findByIdAndUpdate(id, departement);
  }

  static async delete(id) {
    return await Departement.findByIdAndDelete(id);
  }
}

module.exports = DepartementModel;

