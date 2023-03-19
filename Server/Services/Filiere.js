const Filiere = require("../Models/Filiere");

exports.getAll = async () => {
  return await Filiere.find({});
};

exports.getByOptionId = async (id) => {
  const filieres = await Filiere.findOne({ "Options._id": id });
  return filieres;
};

exports.getById = async (id) => {
  const filiere = await Filiere.findById(id);
  return filiere;
};

exports.getByDepartement = (id_departement) => {
  return Filiere.find({ id_departement });
};

exports.insert = async (filiere) => {
  return await Filiere.create(filiere);
};

exports.update = async (id, filiere) => {
  return await Filiere.findByIdAndUpdate(id, filiere);
};

exports.remove = async (id) => {
  return await Filiere.findByIdAndDelete(id);
};

exports.removeOption = async (id, option_id) => {
  return await Filiere.findByIdAndUpdate(id, {
    $pull: { Options: { _id: option_id } },
  });
};

exports.removeByDepartement = (id_departement) => {
  return Filiere.deleteMany({ id_departement });
};

exports.IsCoordinateur = async (id_professeur) => {
  try {
    const filiere = await Filiere.findOne({ id_coordinateur: id_professeur });
    if (filiere) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
