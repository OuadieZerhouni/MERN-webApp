const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
try {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
} catch (error) {
    console.log(error);
}
const reunionSchema = new mongoose.Schema({
  Date: String,
  lieu: String,
  id_departement: mongoose.Types.ObjectId,
  LOJ: [{ _id: mongoose.Types.ObjectId, value: String }],
  prof_present: [{ _id: mongoose.Types.ObjectId }],
  prof_absent: [{ _id: mongoose.Types.ObjectId }],
  PVs:{
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
});

const Reunion = mongoose.model("Reunion", reunionSchema);

class ReunionModel {
    
    static async insert(reunion) {
        return await new Reunion(reunion).save();
    }
    static async getAll() {
        return await Reunion.find({});
    }
    
    static async getById(id) {
        return await Reunion.findById(id);
    }
    static async getByDate(date) {
        return await Reunion.find({ Date: date });
    }
    static async AddLOJ(id, value) {
        return await Reunion.findByIdAndUpdate(id, {
            $push: { LOJ: value },
        });
    }
    static async RemoveLOJ(id, value) {
        return await Reunion.findByIdAndUpdate(id, {
            $pull: { LOJ: value },
        });
    }
    static async AddProfPresent(id, value) {
        return await Reunion.findByIdAndUpdate(id, {
            $push: { prof_present: value },
        });
    }
    static async RemoveProfPresent(id, value) {
        return await Reunion.findByIdAndUpdate(id, {
            $pull: { prof_present: value },
        });
    }
    static async AddProfAbsent(id, value) {
        return await Reunion.findByIdAndUpdate(id, {
            $push: { prof_absent: value },
        });
    }
    static async RemoveProfAbsent(id, value) {
        return await Reunion.findByIdAndUpdate(id, {
            $pull: { prof_absent: value },
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

    /* PVs */
    static async AddPV(id, value) {
        return await Reunion.findByIdAndUpdate(id, {
            $push: { PVs: value },
        });
    }
    static async RemovePV(id, value) {
        return await Reunion.findByIdAndUpdate(id, {
            $pull: { PVs: value },
        });
    }
    static async UpdatePV(id, id_pv, value) {
        return await Reunion.updateOne(
            { _id: id, "PVs._id": id_pv },
            { $set: { "PVs.$": value } }
        );
    }
    //get comments by pv id
    static async getCommentsByPV(id_reunion, id_pv) {
        return await Reunion.find(
            { _id: id_reunion, "PVs._id": id_pv },
            { "PVs.$": 1 }
        );}
    static async AddComment(id_reunion, id_pv, value) {
        return await Reunion.updateOne(
            { _id: id_reunion, "PVs._id": id_pv },
            { $push: { "PVs.$.comments": value } }
        );
    }
    static async RemoveComment(id_reunion, id_pv,id_comment) {
        return await Reunion.updateOne(
            { _id: id_reunion, "PVs._id": id_pv },
            { $pull: { "PVs.$.comments": { _id: id_comment } } }
        );
    }
    static async UpdateComment(id_reunion, id_pv, id_comment, value) {
        return await Reunion.updateOne(
            { _id: id_reunion, "PVs._id": id_pv, "PVs.comments._id": id_comment },
            { $set: { "PVs.$.comments.$": value } }
        );
    }


}

module.exports = ReunionModel;