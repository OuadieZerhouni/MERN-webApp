const express = require("express");
const router = express.Router();
const OptionService = require("../Services/Option");
const FiliereService = require("../Services/Filiere");

const ToPDF = require("../util/ToPDF").ToPDF;
const Emploi_Upload = require("../util/Fileupload").Emploi_Upload;
const fs = require("fs");
const path = require("path");
const pdfToImages = require("../util/ToPDF").pdfToImages;

router.post("/insert", Emploi_Upload.single("file"), async (req, res) => {
  ToPDF(req.file, req.body.Nom).then(async (_pdfPath) => {
    const imageDirPath = await pdfToImages(_pdfPath);

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
  try {
    const emploiTemps = await OptionService.getEmploiTempsByOptionId(
      req.body._id
    );

    const filePath = emploiTemps.Lien_consultation;
    const imageDirPath = path.resolve(filePath.replace(".pdf", ""));

    let Path = `${imageDirPath}\\images`;
    const files = fs.readdirSync(Path);

    const numPages = files.filter((file) => file.endsWith(".png")).length;
    let _path =
      "http://localhost:3001/" +
      path.relative(imageDirPath).replace(/\\/g, "/") +
      "/images";

    // Send the image directory path and the number of images
    res.send({
      path: _path,
      numPages: numPages,
    });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).send(err);
  }
});

router.post("/get", async (req, res) => {
  const option = await OptionService.getOptionById(req.body._id);
  res.send(option);
});

router.post("/get/filiere", async (req, res) => {
  const options = await OptionService.getOptionsByFiliereId(req.body._id);
  res.send(options);
});
router.post("/delete", async (req, res) => {
  const options = await OptionService.deleteOptions(req.body._id);
  res.send(options);
});

router.post("/update", Emploi_Upload.single("file"), async (req, res) => {
  //if there a file sent
  if (req.file) {
    // Creat the old directory if it doesn't exist

    // Move the old files to the old directory
    try {
      const emploiTemps = await OptionService.getEmploiTempsByOptionId(req.body._id);
      const filePathpdf = emploiTemps.Lien_consultation;
      const filePathxl = emploiTemps.Lien_modification;
      const imageDirPath = filePathpdf.replace(".pdf", "");
      console.log(filePathpdf);
      
      const oldDirPath = 'uploads/old';
      if (!fs.existsSync(oldDirPath)) {
        fs.mkdirSync(oldDirPath);
      }
      
      const oldPathpdf = path.resolve(oldDirPath, path.basename(filePathpdf));
      const oldPathxl = path.resolve(oldDirPath, path.basename(filePathxl));
      const oldPathimages = path.resolve(oldDirPath, path.basename(imageDirPath));
      console.log("old oath"+oldPathpdf)
      fs.renameSync(filePathpdf, oldPathpdf);
      fs.renameSync(filePathxl, oldPathxl);
      fs.renameSync(imageDirPath, oldPathimages);
      
    } catch (err) {
      console.error(err);
      // Handle the error here
    }
    ToPDF(req.file, req.body.Nom).then(async (_pdfPath) => {
      const imageDirPath = await pdfToImages(_pdfPath);

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
      const options = await OptionService.updateOption(
        req.body._id,
        optionData
      );
      res.send(options);
    });
  } else {
    const optionData = {
      Nom: req.body.Nom,
      Description: req.body.Description,
      Date_Creation: req.body.Date_Creation,
      effectif: req.body.effectif,
    };
    console.log(req.body);
    const oldFiliere = await FiliereService.getByOptionId(req.body._id);
    console.log(oldFiliere);
    if (oldFiliere._id != req.body._id_filiere) {
      //delete the option from the old filiere
      await FiliereService.removeOption(oldFiliere._id, req.body._id);
      //add the option to the new filiere
      const options = await OptionService.insertOption(
        req.body._id_filiere,
        optionData
      );
      res.send(options);
    } else {
      const options = await OptionService.updateOption(
        req.body._id,
        optionData
      );
      res.send(options);
    }
  }
});

module.exports = router;
