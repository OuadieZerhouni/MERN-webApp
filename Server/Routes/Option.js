const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const OptionService = require("../Services/Option");
const FiliereService = require("../Services/Filiere");
const pdfToImages = require("../util/ToPDF").pdfToImages;
require("dotenv").config();
const ToPDF = require("../util/ToPDF").ToPDF;
const Emploi_Upload = require("../util/Fileupload").Emploi_Upload;
const fs = require("fs");
const path = require("path");

const AdminChefVerifyoptionInsert =
  require("../util/verification").AdminChefVerifyoptionInsert;
const AdminChefVerifyoptionDelete =
  require("../util/verification").AdminChefVerifyoptionDelete;

// Insert a new option
router.post(
  "/",
  Emploi_Upload.single("file"),
  AdminChefVerifyoptionInsert,
  async (req, res) => {
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
  }
);

router.get("/Emploi_temps/:id", async (req, res) => {
  try {
    const emploiTemps = await OptionService.getEmploiTempsByOptionId(
      req.params.id
    );
    let filePath = emploiTemps.Lien_consultation;
    filePath = filePath.replace(".pdf", "");
    const imageDirPath = path.resolve(filePath);

    let Path = `${imageDirPath}\\images`;

    const files = fs.readdirSync(Path);

    const numPages = files.filter((file) => file.endsWith(".png")).length;
    console.log(imageDirPath);

    let _path = (process.env.APP_DOMAIN+"/"+
    imageDirPath + "/images").replace(/\\/g, "/");
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

// Get an option by id
router.get("/:optionId", param("optionId").isMongoId(), async (req, res) => {
  const option = await OptionService.getOptionById(req.params.optionId);
  if (!option) {
    return res.status(404).send({ error: "Option not found" });
  }
  res.send(option);
});

// Get options by filiere id
router.get(
  "/filiere/:filiereId",
  param("filiereId").isMongoId(),
  async (req, res) => {
    const options = await OptionService.getOptionsByFiliereId(
      req.params.filiereId
    );
    res.send(options);
  }
);

// Delete an option by id
router.delete(
  "/:optionId",
  AdminChefVerifyoptionDelete,
  param("optionId").isMongoId(),
  async (req, res) => {
    const option = await OptionService.deleteOption(req.params.optionId);
    if (!option) {
      return res.status(404).send({ error: "Option not found" });
    }
    res.send(option);
  }
);

// Update an option by id
router.put("/:optionId", Emploi_Upload.single("file"), async (req, res) => {
  // Validate the option ID parameter
  const errors = param("optionId").isMongoId().validate(req.params.optionId);
  if (errors.length) {
    return res.status(400).send({ error: errors[0].msg });
  }

  // If there is a file sent
  if (req.file) {
    // Create the old directory if it doesn't exist
    const oldDirPath = "uploads/old";
    if (!fs.existsSync(oldDirPath)) {
      fs.mkdirSync(oldDirPath);
    }

    try {
      // Get the old file paths
      const emploiTemps = await OptionService.getEmploiTempsByOptionId(
        req.params.optionId
      );
      const filePathpdf = emploiTemps.Lien_consultation;
      const filePathxl = emploiTemps.Lien_modification;
      const imageDirPath = path.join(
        path.dirname(filePathpdf),
        path.basename(filePathpdf, ".pdf")
      );

      // Move the old files to the old directory

      const oldPathpdf = path.join(oldDirPath, path.basename(filePathpdf));
      const oldPathxl = path.join(oldDirPath, path.basename(filePathxl));
      const oldPathimage = path.join(oldDirPath, path.basename(imageDirPath));
      fs.renameSync(filePathpdf, oldPathpdf);
      fs.renameSync(filePathxl, oldPathxl);
      fs.renameSync(imageDirPath, oldPathimage);
    } catch (err) {
      console.log(err);
    }

    // Convert the new file to img
    pdfToImages(req.file.path).then(async (_pdfPath) => {
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
      const option = await OptionService.updateOption(
        req.params.optionId,
        optionData
      );
      res.send(option);
    });
  } else {
    const optionData = {
      Nom: req.body.Nom,
      Description: req.body.Description,
      Date_Creation: req.body.Date_Creation,
      effectif: req.body.effectif,
    };
    const option = await OptionService.updateOption(
      req.params.optionId,
      optionData
    );
    res.send(option);
  }
});

module.exports = router;
