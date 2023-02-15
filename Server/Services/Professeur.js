const Professeur = require("../Models/Professeur");
const Departement = require("../Services/Departement");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getByEmail = async function (email) {
  return await Professeur.findOne({ email: email });
};

exports.insert = async function (professeur) {
  return await Professeur.create(professeur);
};

exports.update = async function (id, professeur) {
  return await Professeur.findByIdAndUpdate(id, professeur);
};

exports.remove = async function (id) {
  return await Professeur.findByIdAndDelete(id);
};

exports.getAll = async function () {
  return await Professeur.find(
    {},
    {
      _id: 1,
      FullName: 1,
      CIN: 1,
      PhoneNumber: 1,
      email: 1,
      grade: 1,
      id_departement: 1,
    }
  );
};

exports.getById = async function (id) {
  try {
    if (id === "") {
      return {
        FullName: "None",
        CIN: "",
        PhoneNumber: "",
        email: "",
        departement: "",
        grade: "",
      };
    } else {
      return await Professeur.findById(id, {
        _id: 1,
        FullName: 1,
        CIN: 1,
        PhoneNumber: 1,
        password:1,
        email: 1,
        grade: 1,
        id_departement: 1,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getByCIN = async function (CIN) {
  return await Professeur.find({ CIN: CIN });
};

exports.getByFullName = async function (FullName) {
  return await Professeur.find(
    { FullName: FullName },
    {
      _id: 1,
      FullName: 1,
      CIN: 1,
      PhoneNumber: 1,
      email: 1,
      id_departement: 1,
      grade: 1,
    }
  );
};

exports.getByDepartement = async function (departementId) {
  let Depart = await Departement.getById(departementId);
  if(!Depart) return [];
  return await Professeur.find(
    { _id: { $in: Depart.professeurs } },
    {
      _id: 1,
      FullName: 1,
      CIN: 1,
      PhoneNumber: 1,
      email: 1,
      id_departement: 1,
      grade: 1,
    }
  );
};

exports.setIdDepartement = async function (id_prof, departementId) {
  return await Professeur.findByIdAndUpdate(id_prof, {
    id_departement: departementId,
  });
};
