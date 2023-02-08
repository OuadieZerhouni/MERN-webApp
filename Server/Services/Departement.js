const Departement=require("../Models/Departement");

exports.insert = async function (departement) {
    return await Departement.create(departement);
  }

    exports.getAll = async function () {
    return await Departement.find({});
  }

    exports.getById = async function (id) {
    return await Departement.findById(id).exec();
  }
    exports.getByNom = async function (nom) {
    return await Departement.find({ Nom: nom });
  }

    exports.update = async function (id, departement) {
    return await Departement.findByIdAndUpdate(id, departement);
  }

    exports.remove = async function (id) {
    return await Departement.findByIdAndDelete(id);
  }
    exports.addProfesseur = async function (id_Dep, id_professeur) {
    return await Departement.findByIdAndUpdate(id_Dep, {
      $addToSet: { professeurs: id_professeur },
    });
  }