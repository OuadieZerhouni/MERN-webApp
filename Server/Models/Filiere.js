const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const filiereSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  Nom: String,
  Description: String,
  Date_Creation: Date,
  effectif: Number,
  Options: [
    {
      _id: mongoose.Types.ObjectId,
      Nom: String,
      Description: String,
      Date_Creation: Date,
      effectif: Number,
      Emploi_temps: {
        Lien_modification: String,
        Lien_consultation: String,
        Semestre: Number,
        Date_Creation: Date,
      },
    },
  ],
  id_coordinateur: mongoose.Types.ObjectId,
  id_departement: mongoose.Types.ObjectId,
});

const Filiere = mongoose.model("Filiere", filiereSchema);

class FiliereModel {
  static async getAll() {
    return await Filiere.find({});
  }

  static async getById(id) {
    return await Filiere.findById(id);
  }
  static async getByNom(nom) {
    return await Filiere.find({ Nom: nom });
  }
  static async getByDepartement(id_departement) {
    return await Filiere.find({
      id_departement: id_departement,
    });
  }
  static async insert(filiere) {
    return await new Filiere(filiere).save();
  }

  static async update(id, filiere) {
    return await Filiere.findByIdAndUpdate(id, filiere);
  }

  static async delete(id) {
    return await Filiere.findByIdAndDelete(id);
  }
}

module.exports = FiliereModel;
