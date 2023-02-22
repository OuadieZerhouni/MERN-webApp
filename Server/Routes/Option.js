const express = require("express");
const router = express.Router();
const Filiere = require("../Services/Option");
const uuid = require("uuid").v4;
const fs = require("fs");
const ToPDF = require('../util/ToPDF').ToPDF
const Emploi_Upload=require('../util/Fileupload').Emploi_Upload



router.post("/insert", Emploi_Upload.single("file"), async (req, res) => {
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
