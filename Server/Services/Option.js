const Filiere = require("../Models/Filiere");

exports.getOptionsByFiliereId = async (id) => {
  return await Filiere.findById(id).select("Options");
};
exports.getOptionById = async (id) => {
  return await Filiere.find({ "Options._id": id });
};
exports.insertOption = async (id, option) => {
  return await Filiere.findByIdAndUpdate(id, {
    $addToSet: { Options: option },
  });
};
exports.updateOption = async (option_id, option) => {
  return await Filiere.findOneAndUpdate(
    { "Options._id": option_id },
    { $set: { "Options.$": option } }
  );
};
exports.deleteOption = async (option_id) => {
  return await Filiere.findOneAndUpdate(
    { "Options._id": option_id },
    { $pull: { Options: { _id: option_id } } }
  );
};
//CRUD for Emploi_temps
exports.getEmploiTempsByOptionId = async (option_id) => {
  return await Filiere.find({ "Options._id": option_id }).select(
    "Options.Emploi_temps"
  );
};
exports.insertEmploiTemps = async (option_id, emploi_temps) => {
  return await Filiere.findOneAndUpdate(
    { "Options._id": option_id },
    { $set: { "Options.$.Emploi_temps": emploi_temps } }
  );
};
exports.updateEmploiTemps = async (option_id, emploi_temps) => {
  return await Filiere.findOneAndUpdate(
    { "Options._id": option_id },
    { $set: { "Options.$.Emploi_temps": emploi_temps } }
  );
};
exports.deleteEmploiTemps = async (option_id) => {
  return await Filiere.findOneAndUpdate(
    { "Options._id": option_id },
    { $set: { "Options.$.Emploi_temps": {} } }
  );
};
