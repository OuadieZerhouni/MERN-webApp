const express = require("express");
const router = express.Router();
const OptionService = require("../Services/Option");
const uuid = require("uuid").v4;
const ToPDF = require("../util/ToPDF").ToPDF;
const Emploi_Upload = require("../util/Fileupload").Emploi_Upload;
const path = require("path");
const fs = require("fs");


router.post("/insert", Emploi_Upload.single("file"), async (req, res) => {
  const pdfPath = await ToPDF(req.file, req.body.Nom);
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
  const option = await OptionService.insertOption(req.body._id, optionData);

  res.send(option);
});


router.post("/Emploi_temps", async (req, res) => {
  const emploiTemps = await OptionService.getEmploiTempsByOptionId(req.body._id);
  const filePath = emploiTemps.Lien_consultation;
  const fileContent = fs.readFileSync(filePath);
  res.contentType('application/pdf');
  res.send(fileContent);
});



router.post("/get", async (req, res) => {
  const options = await OptionService.getOptionById(req.body._id);
  res.send(options);
});

router.post("/get/OptionService", async (req, res) => {
  const options = await OptionService.getOptionsByFiliereId(req.body._id);
  res.send(options);
});
router.post("/delete", async (req, res) => {
  const options = await OptionService.deleteOptions(req.body._id);
  res.send(options);
});
router.post("/update", async (req, res) => {
  const options = await OptionService.updateOptions(req.body._id, req.body);
  res.send(options);
});

module.exports = router;
