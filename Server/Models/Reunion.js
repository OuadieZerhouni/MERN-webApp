const mongoose = require("mongoose");
require("dotenv").config();
const comment = require("./Comment")

const reunionSchema = new mongoose.Schema({
  Date: String,
  Lieu: String,
  id_departement: String,
  LOJ: [ String ],
  prof_present: [ {type:mongoose.Types.ObjectId ,ref:"professeurs"}],
  PV:{
      link: String,
      date_creation: Date,
      comments: [comment],
    },
});

const Reunion = mongoose.model("Reunion", reunionSchema);

module.exports = Reunion;