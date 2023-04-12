const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Professeur = require("../Services/Professeur");
const Departement = require("../Services/Departement");
const FiliereService = require("../Services/Filiere");
const ReunionService = require("../Services/Reunion");

const {
  AdminChefVerifyProfInsert,
  AdminChefVerifyProfDelete,
  verifyToken,
} = require("../util/verification");

// Get all professeurs
router.get("/", async (req, res) => {
  try {
    const professeurs = await Professeur.getAll();
    res.send(professeurs);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to get professeurs" });
  }
});

//get professeur by deparetement id
router.get("/departement/:id", async (req, res) => {
  try {
    const professeurs = await Professeur.getByDepartement(req.params.id);
    res.send(professeurs);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to get professeurs by department id" });
  }
});

// Get a specific professeur by id
router.get("/:id", async (req, res) => {
  try {
    const professeur = await Professeur.getById(req.params.id);
    if (!professeur) return res.status(404).send({ message: "Professeur not found" });
    res.send(professeur);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to get professeur by id" });
  }
});

router.use(verifyToken);

// Insert a new professeur
router.post(
  "/",
  AdminChefVerifyProfInsert,
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("FullName").isString(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      req.body.email = req.body.email.toLowerCase();
      let _professeur = await Professeur.getByEmail(req.body.email);
      if (_professeur)
        return res.status(400).send({ message: "Email already exists" });

      req.body.password = await bcrypt.hash(req.body.password, 10);
      const professeur = await Professeur.insert(req.body);

      if (req.body.id_departement != "")
        Departement.addProfesseur(req.body.id_departement, professeur._id);
      res.send(professeur);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to insert a new professeur" });
    }
  }
);

router.put(
  "/:id",
  AdminChefVerifyProfInsert,
  [body("email").isEmail(), body("FullName").isString()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      req.body.email = req.body.email.toLowerCase();
      const oldprofesseur = await Professeur.getById(req.params.id);
      const updatedProfesseur = await Professeur.update(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedProfesseur) {
        return res.status(404).send({ message: "Professeur not found" });
      }

      //check if departement changed
      if (updatedProfesseur.id_departement != req.body.id_departement) {
        Departement.removeProfesseur(
          oldprofesseur.id_departement,
          updatedProfesseur._id
        );

        if (req.body.id_departement) {
          Departement.addProfesseur(
            req.body.id_departement,
            updatedProfesseur._id
          );
        }
      }

      res.send(updatedProfesseur);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to update professeur data" });
    }
  }
);

// Delete a specific professeur by id
router.delete("/:id", AdminChefVerifyProfDelete, async (req, res) => {
  try {
    const professeur = await Professeur.getById(req.params.id);
    if (!professeur) return res.status(404).send({ message: "Professeur not found" });

    await Professeur.delete(req.params.id);
    res.send({ message: "Professeur deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to delete professeur" });
  }
}
);

module.exports = router;
