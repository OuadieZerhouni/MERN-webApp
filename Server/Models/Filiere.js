const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


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
  id_coordinateur: mongoose.Types.ObjectId,
  id_departement: mongoose.Types.ObjectId,
  Options: [
    {
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
      effectif: {
        type: Number,
        required: true
      },
      Emploi_temps: {
        Lien_modification: {
          type: String,
          required: true
        },
        Lien_consultation: {
          type: String,
          required: true
        },
        Semestre: Number,
        Date_Creation: {
          type: Date,
          required: true
        },
      },
    },
  ],
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
  //CRUD for Options
  static async getOptionsByFiliereId(id) {
    return await Filiere.findById(id).select("Options");
  }
  static async getOptionById(id) {
    return await Filiere.find({ "Options._id": id });
  }
  static async insertOption(id, option) {
    return await Filiere.findByIdAndUpdate(id, {
      $push: { Options: option },
    });
  }
  static async updateOption(option_id, option) {
    return await Filiere.findOneAndUpdate(
      { "Options._id": option_id },
      { $set: { "Options.$": option } }
    );
  }
  static async deleteOption(option_id) {
    return await Filiere.findOneAndUpdate(
      { "Options._id": option_id },
      { $pull: { Options: { _id: option_id } } }
    );
  }
  //CRUD for Emploi_temps
  static async getEmploiTempsByOptionId(option_id) {
    return await Filiere.find({ "Options._id": option_id }).select(
      "Options.Emploi_temps"
    );
  }
  static async insertEmploiTemps(option_id, emploi_temps) {
    return await Filiere.findOneAndUpdate(
      { "Options._id": option_id },
      { $set: { "Options.$.Emploi_temps": emploi_temps } }
    );
  }
  static async updateEmploiTemps(option_id, emploi_temps) {
    return await Filiere.findOneAndUpdate(
      { "Options._id": option_id },
      { $set: { "Options.$.Emploi_temps": emploi_temps } }
    );
  }
  static async deleteEmploiTemps(option_id) {
    return await Filiere.findOneAndUpdate(
      { "Options._id": option_id },
      { $set: { "Options.$.Emploi_temps": {} } }
    );
  }


}

module.exports = FiliereModel;
