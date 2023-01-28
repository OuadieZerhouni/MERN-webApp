const mongoose = require("mongoose");
require('dotenv').config();
const Departement = require('./Departement');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


const professeurSchema = new mongoose.Schema({
  CIN: {type:String, unique: true, required: true},
  PhoneNumber:  {type:String, unique: true, required: true},
  FullName:  {type:String, required: true},
  email:  {type:String, unique: true, required: true},
  password:  {type:String, unique: true, required: true},
  role:  {type:String, required: true},
});

const Professeur = mongoose.model("Professeur", professeurSchema);

class ProfesseurModel {//reutrn all info except password
    static async getAll() {
        return await Professeur.find({}, { _id: 1, FullName: 1 , CIN: 1, PhoneNumber: 1, email: 1, departement: 1, role: 1});
    }
    
    static async getById(id) {
        return await Professeur.findById(id, { _id: 1, FullName: 1 , CIN: 1, PhoneNumber: 1, email: 1, departement: 1, role: 1});
    }
    static async getByCIN(CIN) {
        return await Professeur.find({ CIN: CIN });
    }
    static async getByFullName(FullName) {
        return await Professeur.find({ FullName: FullName }, { _id: 1, FullName: 1 , CIN: 1, PhoneNumber: 1, email: 1, departement: 1, role: 1});
    }
    static async getByDepartement(departementId) {
        let Depart = await Departement.getById(departementId)
        return await Professeur.find({ _id: { $in: Depart.professeurs } }, { _id: 1, FullName: 1 , CIN: 1, PhoneNumber: 1, email: 1, departement: 1, role: 1});
    }
    static async getByEmail(email) {
    let prof=Professeur.find({email:email});
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
}

module.exports = ProfesseurModel;
