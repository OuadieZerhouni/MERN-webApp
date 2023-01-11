const mongoose = require("mongoose");
require('dotenv').config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


const professeurSchema = new mongoose.Schema({
  CIN: String,
  PhoneNumber: String,
  FullName: String,
  email: String,
  password: String,
  departement_Name: String,
  role: String,
});

const Professeur = mongoose.model("Professeur", professeurSchema);

class ProfesseurModel {
    static async getAll() {
        return await Professeur.find({}, { _id: 1, FullName: 1 });
    }
    
    static async getById(id) {
        return await Professeur.findById(id, { _id: 1, FullName: 1 , CIN: 1, PhoneNumber: 1, email: 1, departement: 1, role: 1});
    }
    static async getByCIN(CIN) {
        return await Professeur.find({ CIN: CIN });
    }
    static async getByFullName(FullName) {
        return await Professeur.find({ FullName: FullName });
    }
    static async getByDepartement(departement) {
        return await Professeur.find({ departement: departement });
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
