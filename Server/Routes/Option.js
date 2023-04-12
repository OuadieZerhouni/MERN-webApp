const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const OptionService = require("../Services/Option");
const FiliereService = require("../Services/Filiere");
const pdfToImages = require("../util/ToPDF").pdfToImages;
const verifyToken = require("../util/verification").verifyToken;
const Emploi_Upload = require("../util/Fileupload").Emploi_Upload;
const fs = require("fs");
require("dotenv").config();

const AdminChefVerifyoptionInsert =
  require("../util/verification").AdminChefVerifyoptionInsert;
const AdminChefVerifyoptionDelete =
  require("../util/verification").AdminChefVerifyoptionDelete;
router.get("/Emploi_temps/:id", async (req, res) => {
  try {
    const emploiTemps = await OptionService.getEmploiTempsByOptionId(
      req.params.id
    );
    let filePath = emploiTemps.Lien_consultation;
    imageDirPath = filePath.replace(".pdf", "");
    

    let Path = `${imageDirPath}\\images`;

    const files = fs.readdirSync(Path);

    const numPages = files.filter((file) => file.endsWith(".png")).length;

    let _path = (
      process.env.APP_DOMAIN +
      "/" +
      imageDirPath +
      "/images"
    ).replace(/\\/g, "/");
    res.status(200).send({
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
  try {
    const option = await OptionService.getOptionById(req.params.optionId);
    if (!option) {
      return res.status(404).send({ error: "Option not found" });
    }
    res.send(option);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Failed to get option" });
  }
});

// Get options by filiere id
router.get(
  "/filiere/:filiereId",
  param("filiereId").isMongoId(),
  async (req, res) => {
    try {
      const options = await OptionService.getOptionsByFiliereId(
        req.params.filiereId
      );
      res.send(options);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to get options" });
    }
  }
);
router.use(verifyToken);

// Delete an option by id
router.delete(
  "/:optionId",
  AdminChefVerifyoptionDelete,
  param("optionId").isMongoId(),
  async (req, res) => {
    try {
      const option = await OptionService.deleteOption(req.params.optionId);
      if (!option) {
        return res.status(404).send({ error: "Option not found" });
      }
      res.send(option);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to delete option" });
    }
  }
);

// Insert a new option
router.post(
  "/",
  Emploi_Upload.single("file"),
  AdminChefVerifyoptionInsert,
  async (req, res) => {
    try {
      const optionFound = await OptionService.getoptionByName(req.body.Nom);
      if (optionFound.length > 0) {
        return res.status(400).send({ error: "Option name already taken" });
      }

      const imageDirPath = await pdfToImages(req.file.path);
      

      const optionData = {
        Nom: req.body.Nom,
        Description: req.body.Description,
        Date_Creation: req.body.Date_Creation,
        effectif: req.body.effectif,
        Emploi_temps: {
          Lien_modification: req.body.Lien_modification,
          Lien_consultation: req.file.path,
        },
      };

      const option = await OptionService.insertOption(req.body._id, optionData);

      res.status(201).send(option);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Insertion Failed" });
    }
  }
);

/**
 * Update an option by id
 */
router.put(
  "/:optionId",
  Emploi_Upload.single("file"),
  AdminChefVerifyoptionInsert,
  async (req, res) => {
    try {
      let optionData = {};

      if (req.file) {
        // Convert the new file to img
        await pdfToImages(req.file.path);
        optionData = {
          _id: req.body._id,
          Nom: req.body.Nom,
          Description: req.body.Description,
          Date_Creation: req.body.Date_Creation,
          effectif: req.body.effectif,
          Emploi_temps: {
            Lien_modification: req.body.Lien_modification,
            Lien_consultation: req.file.path,
          },
        };
      } else {
        optionData = {
          _id: req.body._id,
          Nom: req.body.Nom,
          Description: req.body.Description,
          Date_Creation: req.body.Date_Creation,
          effectif: req.body.effectif,
          Lien_modification: req.body.Lien_modification,
        };
      }
      const option = await OptionService.updateOption(
        optionData._id,
        optionData
      );
      if (!option) {
        return res.status(404).send({ error: "Option not found" });
      }
      res.send(option);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to update option" });
    }
  }
);

module.exports = router;
