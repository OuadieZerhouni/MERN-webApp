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

// class DepartementModel {
//   static async insert(departement) {
//     return await Departement.create(departement);
//   }

//   static async getAll() {
//     return await Departement.find({});
//   }

//   static async getById(id) {
//     return await Departement.findById(id).exec();
//   }
//   static async getByNom(nom) {
//     return await Departement.find({ Nom: nom });
//   }

//   static async update(id, departement) {
//     return await Departement.findByIdAndUpdate(id, departement);
//   }

//   static async delete(id) {
//     return await Departement.findByIdAndDelete(id);
//   }
//   static async addProfesseur(id_Dep, id_professeur) {
//     return await Departement.findByIdAndUpdate(id_Dep, {
//       $addToSet: { professeurs: id_professeur },
//     });
//   }
// }

