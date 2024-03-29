const mongoose = require("mongoose");
require("dotenv").config();


const OptionSchema =new mongoose.Schema({ 
    Nom: {
      type: String,
      unique: true,
      required: true
    },
    Description: {
      type: String,
      required: true
    },
    Date_Creation: {
      type: Date,
      required: true
    },
    effectif: {
      type: Number,
      required: true
    },
    Emploi_temps: {
      Lien_modification: {
        type: String,
        required: true
      },
      Lien_consultation: {
        type: String,
        required: true
      },
    },
  }
);


module.exports = OptionSchema;
