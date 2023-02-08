const mongoose = require("mongoose");
require("dotenv").config();
const Departement = require("./Departement");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const professeurSchema = new mongoose.Schema({
  CIN: {
    type: String,
    unique: true,
    required: true,
  },
  PhoneNumber: {
    type: String,
    unique: true,
  },
  FullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    unique: true,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  id_departement: {
    type: mongoose.Types.ObjectId,
    ref: "departements",
  },
});

const Professeur = mongoose.model("Professeur", professeurSchema);

class ProfesseurModel {
  static async getByEmail(email) {
    return await Professeur.findOne({ email: email });
  }

  static async insert(professeur) {
    return await new Professeur(professeur).save();
  }

  static async update(id, professeur) {
    return await Professeur.findByIdAndUpdate(id, professeur);
  }

  static async delete(id) {
    return await Professeur.findByIdAndDelete(id);
  }
  static async getAll() {
    return await Professeur.find(
      {},
      {
        _id: 1,
        FullName: 1,
        CIN: 1,
        PhoneNumber: 1,
        email: 1,
        departement: 1,
        grade: 1,
      }
    );
  }

  static async getById(id) {
    console.log("id:"+id);
    try{
      if(id===""){
        return {FullName:"None",CIN:"",PhoneNumber:"",email:"",departement:"",grade:""}
      }
      else{return await Professeur.findById(id, {
      _id: 1,
      FullName: 1,
      CIN: 1,
      PhoneNumber: 1,
      email: 1,
      departement: 1,
      grade: 1,
    });}}
    catch(err){
      console.log(err);
    }


  }
  static async getByCIN(CIN) {
    return await Professeur.find({ CIN: CIN });
  }
  static async getByFullName(FullName) {
    return await Professeur.find(
      { FullName: FullName },
      {
        _id: 1,
        FullName: 1,
        CIN: 1,
        PhoneNumber: 1,
        email: 1,
        departement: 1,
        grade: 1,
      }
    );
  }
  static async getByDepartement(departementId) {
    let Depart = await Departement.getById(departementId);
    return await Professeur.find(
      { _id: { $in: Depart.professeurs } },
      {
        _id: 1,
        FullName: 1,
        CIN: 1,
        PhoneNumber: 1,
        email: 1,
        departement: 1,
        grade: 1,
      }
    );
  }

  static async setIdDepartement(id_prof, departementId) {
    return await Professeur.findByIdAndUpdate(id_prof, {
      id_departement: departementId,
    });
  }
}

module.exports = ProfesseurModel;
