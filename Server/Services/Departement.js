const Departement=require("../Models/Departement");
const Professeur = require("../Models/Professeur");
const FiliereService=require("../Services/Filiere");
const ReunionService=require("../Services/Reunion");



exports.insert = async function (departement) {
    return await Departement.create(departement);
  }

    exports.getAll = async function () {
    return await Departement.find({});
  }

    exports.getById = async function (id) {
    return await Departement.findById(id);
  }
    exports.getByNom = async function (nom) {
    return await Departement.find({ Nom: nom });
  }

    exports.update = async function (id, departement) {
    return await Departement.findByIdAndUpdate(id, departement);
  }

    exports.remove = async function (id) {
      await FiliereService.removeByDepartement(id);
      await ReunionService.removeByDepartement(id);
      
    return await Departement.findByIdAndDelete(id);
  }
    exports.addProfesseur = async function (id_Dep, id_professeur) {
    return await Departement.findByIdAndUpdate(id_Dep, {
      $addToSet: { professeurs: id_professeur },
    });
  }
    exports.removeProfesseur = async function (id_Dep, id_professeur) {
    return await Departement.findByIdAndUpdate(id_Dep, {
      $pull: { professeurs: id_professeur },
    });
  }
  
  exports.IsChef = async function ( id_professeur) {
    const departement = await Departement.findOne({ id_Chef: id_professeur });
    if (departement) return departement;
    else return false;

  }
