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


// class FiliereModel {
//   static async getAll() {
//     return await Filiere.find({});
//   }

//   static async getById(id) {
//     return await Filiere.findById(id);
//   }
//   static async getByNom(nom) {
//     return await Filiere.find({ Nom: nom });
//   }
//   static async getByDepartement(id_departement) {
//     return await Filiere.find({
//       id_departement: id_departement,
//     });
//   }
//   static async insert(filiere) {
//     return await Filiere.create(filiere);
//   }

//   static async update(id, filiere) {
//     return await Filiere.findByIdAndUpdate(id, filiere);
//   }

//   static async delete(id) {
//     return await Filiere.findByIdAndDelete(id);
//   }
//   //CRUD for Options
//   static async getOptionsByFiliereId(id) {
//     return await Filiere.findById(id).select("Options");
//   }
//   static async getOptionById(id) {
//     return await Filiere.find({ "Options._id": id });
//   }
//   static async insertOption(id, option) {
//     return await Filiere.findByIdAndUpdate(id, {
//       $addToSet: { Options: option },
//     });
//   }
//   static async updateOption(option_id, option) {
//     return await Filiere.findOneAndUpdate(
//       { "Options._id": option_id },
//       { $set: { "Options.$": option } }
//     );
//   }
//   static async deleteOption(option_id) {
//     return await Filiere.findOneAndUpdate(
//       { "Options._id": option_id },
//       { $pull: { Options: { _id: option_id } } }
//     );
//   }
//   //CRUD for Emploi_temps
//   static async getEmploiTempsByOptionId(option_id) {
//     return await Filiere.find({ "Options._id": option_id }).select(
//       "Options.Emploi_temps"
//     );
//   }
//   static async insertEmploiTemps(option_id, emploi_temps) {
//     return await Filiere.findOneAndUpdate(
//       { "Options._id": option_id },
//       { $set: { "Options.$.Emploi_temps": emploi_temps } }
//     );
//   }
//   static async updateEmploiTemps(option_id, emploi_temps) {
//     return await Filiere.findOneAndUpdate(
//       { "Options._id": option_id },
//       { $set: { "Options.$.Emploi_temps": emploi_temps } }
//     );
//   }
//   static async deleteEmploiTemps(option_id) {
//     return await Filiere.findOneAndUpdate(
//       { "Options._id": option_id },
//       { $set: { "Options.$.Emploi_temps": {} } }
//     );
//   }


// }

