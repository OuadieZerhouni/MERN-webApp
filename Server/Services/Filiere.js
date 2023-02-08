const Filiere = require("../Models/Filiere")

       exports.getAll = async function () {
      return await Filiere.find({});
    }
  
       exports.getById = async function (id) {
      return await Filiere.findById(id);
    }
       exports.getByNom = async function (nom) {
      return await Filiere.find({ Nom: nom });
    }
       exports.getByDepartemen = async function (id_departement) {
      return await Filiere.find({
        id_departement: id_departement,
      });
    }
       exports.insert = async function (filiere) {
      return await Filiere.create(filiere);
    }
  
       exports.update = async function (id, filiere) {
      return await Filiere.findByIdAndUpdate(id, filiere);
    }
  
       exports.remove = async function (id) {
      return await Filiere.findByIdAndDelete(id);
    }
    //CRUD for Options
    //    exports.getOptionsByFiliereId(id) {
    //   return await Filiere.findById(id).select("Options");
    // }
    //    exports.getOptionById(id) {
    //   return await Filiere.find({ "Options._id": id });
    // }
    //    exports.insertOption(id, option) {
    //   return await Filiere.findByIdAndUpdate(id, {
    //     $addToSet: { Options: option },
    //   });
    // }
    //    exports.updateOption(option_id, option) {
    //   return await Filiere.findOneAndUpdate(
    //     { "Options._id": option_id },
    //     { $set: { "Options.$": option } }
    //   );
    // }
    //    exports.deleteOption(option_id) {
    //   return await Filiere.findOneAndUpdate(
    //     { "Options._id": option_id },
    //     { $pull: { Options: { _id: option_id } } }
    //   );
    // }
    // //CRUD for Emploi_temps
    //    exports.getEmploiTempsByOptionId(option_id) {
    //   return await Filiere.find({ "Options._id": option_id }).select(
    //     "Options.Emploi_temps"
    //   );
    // }
    //    exports.insertEmploiTemps(option_id, emploi_temps) {
    //   return await Filiere.findOneAndUpdate(
    //     { "Options._id": option_id },
    //     { $set: { "Options.$.Emploi_temps": emploi_temps } }
    //   );
    // }
    //    exports.updateEmploiTemps(option_id, emploi_temps) {
    //   return await Filiere.findOneAndUpdate(
    //     { "Options._id": option_id },
    //     { $set: { "Options.$.Emploi_temps": emploi_temps } }
    //   );
    // }
    //    exports.deleteEmploiTemps(option_id) {
    //   return await Filiere.findOneAndUpdate(
    //     { "Options._id": option_id },
    //     { $set: { "Options.$.Emploi_temps": {} } }
    //   );
    // }
  
  