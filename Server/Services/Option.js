const Filiere = require("../Models/Filiere");

exports.getOptionsByFiliereId = async (id) => {
  return await Filiere.findById(id).select("Options");
};
exports.getOptionById = async (id) => {

  const option=await Filiere.find({ "Options._id": id }).select("Options.$");
  console.log(option[0].Options[0])
  return option[0].Options[0];
};
exports.insertOption = async (id, option) => {
  
    Filiere.findByIdAndUpdate(id, {
    $addToSet: { Options: option },
  }).then((result) => {
    return option;
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
  const filiere = await Filiere.findOne(
    { "Options._id": option_id },
    { "Options.$": 1 }
  );
  if (!filiere) return null;
  const option = filiere.Options.find((opt) => opt._id.equals(option_id));
  return option ? option.Emploi_temps : null;
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
