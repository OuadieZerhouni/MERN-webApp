const express = require("express");
const router = express.Router();
const Departement = require("../Services/Departement");
const Professeur = require("../Services/Professeur");
const { body, validationResult } = require("express-validator");
const {
  AdminVerify,
  AdminChefVerifyDepart,
  verifyToken,
} = require("../util/verification");

// Create a departement

// Retrieve all departements
router.get("/", async (req, res) => {
  try {
    const departements = await Departement.getAll();
    res.status(200).json(departements);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Retrieve a specific departement by ID
router.get("/:id", async (req, res) => {
  try {
    const departement = await Departement.getById(req.params.id);
    if (!departement) {
      return res.status(404).json({ message: "Departement not found" });
    }
    res.status(200).json(departement);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Retrieve a specific departement by Nom
router.get("/search", async (req, res) => {
  try {
    const departement = await Departement.getByNom(req.query.Nom);
    if (!departement) {
      return res.status(404).json({ message: "Departement not found" });
    }
    res.status(200).json(departement);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.use(verifyToken);
router.post(
  "/",
  AdminVerify,
  [
    body("Nom").notEmpty().withMessage("Nom is required"),
    body("professeurs").notEmpty().withMessage("professeurs is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const departement = await Departement.insert(req.body);
      await Promise.all(
        req.body.professeurs.map((prof) =>
          Professeur.setIdDepartement(prof, departement._id)
        )
      );
      res.status(201).json(departement);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// Update a departement
router.put(
  "/:id",
  AdminChefVerifyDepart,
  [
    body("Nom").notEmpty().withMessage("Nom is required"),
    body("professeurs").notEmpty().withMessage("professeurs is required"),
  ],
  async (req, res) => {
    try {
      const { id } = req.params;
      const { professeurs } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const oldDepartement = await Departement.getById(id);
      const oldProfesseurs = oldDepartement.professeurs;
      const removedProfesseurs = oldProfesseurs.filter(
        (prof) => !professeurs.includes(prof)
      );
      const addedProfesseurs = professeurs.filter(
        (prof) => !oldProfesseurs.includes(prof)
      );
      await Promise.all(
        removedProfesseurs.map((prof) =>
          Professeur.setIdDepartement(prof, null)
        )
      );
      await Promise.all(
        addedProfesseurs.map((prof) => Professeur.setIdDepartement(prof, id))
      );

      const departement = await Departement.update(id, { ...req.body });
      if (!departement) {
        return res.status(404).json({ message: "Departement not found" });
      }
      res.status(200).json(departement);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// Delete a departement by ID
router.delete("/:id", AdminVerify, async (req, res) => {
  try {
    const { id } = req.params;
    const departement = await Departement.getById(id);
    if (!departement) {
      return res.status(404).json({ message: "Departement not found" });
    }
    await Promise.all(
      departement.professeurs.map((prof) =>
        Professeur.setIdDepartement(prof, null)
      )
    );
    await Departement.remove(id);
    res.status(200).json({ message: "Departement deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
