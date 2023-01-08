const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const reunionSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  //Date:dtaeTiome ,
  Date: String,
  lieu: String,
  id_departement: mongoose.Types.ObjectId,
  LOJ: [{ _id: mongoose.Types.ObjectId, value: String }],
  prof_present: [{ _id: mongoose.Types.ObjectId }],
  prof_absent: [{ _id: mongoose.Types.ObjectId }],
  PVs: [
    {
      _id: mongoose.Types.ObjectId,
      link: String,
      date_upload: Date,
      comments: [
        {
          _id: mongoose.Types.ObjectId,
          value: String,
          date_comment: Date,
          professeur: { _id: mongoose.Types.ObjectId },
        },
      ],
    },
  ],
});

const Reunion = mongoose.model("Reunion", reunionSchema);

class ReunionModel {
    static async getAll() {
        return await Reunion.find({});
    }
    
    static async getById(id) {
        return await Reunion.findById(id);
    }
    static async getByDate(date) {
        return await Reunion.find({ Date: date });
    }
    static async AddMessage(id, message) {
        return await Reunion.findByIdAndUpdate(id, {
            $push: { LOJ: message },
        });
    }
    static async getByDepartement(id_departement) {
        return await Reunion.find({
            id_departement: id_departement,
        });
    }
    static async insert(reunion) {
        return await new Reunion(reunion).save();
    }

    static async update(id, reunion) {
        return await Reunion.findByIdAndUpdate(id, reunion);
    }

    static async delete(id) {
        return await Reunion.findByIdAndDelete(id);
    }
}

module.exports = ReunionModel;