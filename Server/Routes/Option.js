const express = require("express");
const router = express.Router();
const OptionService = require("../Services/Option");
const ToPDF = require("../util/ToPDF").ToPDF;
const Emploi_Upload = require("../util/Fileupload").Emploi_Upload;
const fs = require("fs");
const path = require("path");
const pdfToImages = require("../util/ToPDF").pdfToImages;

router.post("/insert", Emploi_Upload.single("file"), async (req, res) => {
  let pdfPath = "";
  let imageDirPath = "";

  ToPDF(req.file, req.body.Nom).then(async(_pdfPath) => {
    imageDirPath = await pdfToImages(_pdfPath);

    const optionData = {
      Nom: req.body.Nom,
      Description: req.body.Description,
      Date_Creation: req.body.Date_Creation,
      effectif: req.body.effectif,
      Emploi_temps: {
        Lien_modification: req.file.path,
        Lien_consultation: _pdfPath,
      },
    };
    const option = await OptionService.insertOption(req.body._id, optionData);
  
    res.send(option);
  });

  
});
router.post("/Emploi_temps", async (req, res) => {
  try{
    const emploiTemps = await OptionService.getEmploiTempsByOptionId(
    req.body._id
  );

  const filePath = emploiTemps.Lien_consultation;
  const imageDirPath = path.resolve(filePath.replace(".pdf", ""));
  
 
  let Path=`${ imageDirPath}\\images`
  const files = fs.readdirSync(Path);

  const numPages = files.filter(file => file.endsWith(".png")).length;
  let _path="http://localhost:3001/"+path.relative(__dirname, imageDirPath).replace(/\\/g, "/")+"/images";

  // Send the image directory path and the number of images
  res.send({ 
    path: _path,
    numPages: numPages
  });

}
catch(err){
  console.log("Error: "+err);
  res.status(500).send(err);
}
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
