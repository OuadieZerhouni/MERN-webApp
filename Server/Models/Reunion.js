const mongoose = require("mongoose");
require("dotenv").config();

const reunionSchema = new mongoose.Schema({
  Date: String,
  Lieu: String,
  id_departement: String,
  LOJ: [ String ],
  prof_present: [ {type:mongoose.Types.ObjectId ,ref:"professeurs"}],
  PV:{
      link: String,
      date_creation: Date,
      comments: [
        {
          value: String,
          date_comment: Date,
          professeur: String ,
        },
      ],
    },
});

const Reunion = mongoose.model("Reunion", reunionSchema);

module.exports = Reunion;