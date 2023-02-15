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
  