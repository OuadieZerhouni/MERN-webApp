const express = require("express");
const router = express.Router();
const Filiere = require("../Services/Option");
const uuid = require("uuid").v4;
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const pdf = require('html-pdf');
const ToPDF = require('../util/ToPDF').ToPDF


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/Emplois/");
  },
  filename: function (req, file, cb) {
    const Id = uuid();
    const fileName = Id + path.extname(file.originalname);
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

router.post("/insert", upload.single("file"), async (req, res) => {
  const pdfPath = await ToPDF(req.file,req.body.Nom)
  const optionData = {
    Nom: req.body.Nom,
    Description: req.body.Description,
    Date_Creation: req.body.Date_Creation,
    effectif: req.body.effectif,
    Emploi_temps: {
      Lien_modification: req.file.path,
      Lien_consultation: pdfPath,
    },
  };
  const option = await Filiere.insertOption(req.body._id, optionData);

  res.send(option);
});
router.post("/get", async (req, res) => {
  const options = await Filiere.getOptionById(req.body._id);
  res.send(options);
});

router.post("/get/Filiere", async (req, res) => {
  const options = await Filiere.getOptionsByFiliereId(req.body._id);
  res.send(options);
});
router.post("/delete", async (req, res) => {
  const options = await Filiere.deleteOptions(req.body._id);
  res.send(options);
});
router.post("/update", async (req, res) => {
  const options = await Filiere.updateOptions(req.body._id, req.body);
  res.send(options);
});

module.exports = router;
