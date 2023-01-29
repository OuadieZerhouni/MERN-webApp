const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
var conn = mongoose.connection;
conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});

const DepartementSchema = new mongoose.Schema({
  Nom: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Date_Creation: { type: Date, required: true },
  id_Chef: {
    type: String,
  },
  professeurs: [{ type: mongoose.Types.ObjectId, ref: "professeurs" }],
});
const Departement = mongoose.model("departement", DepartementSchema);

class DepartementModel {
  static async insert(departement) {
    return await new Departement(departement).save((err) => {
      if (err) return console.log(err);
    });
  }

  static async getAll() {
    return await Departement.find({});
  }

  static async getById(id) {
    return await Departement.findById(id).exec();
  }
  static async getByNom(nom) {
    return await Departement.find({ Nom: nom });
  }

  static async update(id, departement) {
    return await Departement.findByIdAndUpdate(id, departement);
  }

  static async delete(id) {
    return await Departement.findByIdAndDelete(id);
  }
}

module.exports = DepartementModel;
