const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Professeur = require("../Services/Professeur");
const Departement = require("../Services/Departement");
const {AdminChefVerifyProfInsert,AdminChefVerifyProfDelete} = require("../util/verification");


// Get all professeurs
router.get("/", async (req, res) => {
  const professeurs = await Professeur.getAll();
  res.send(professeurs);
});

// Get a specific professeur by id
router.get("/:id", async (req, res) => {
  const professeur = await Professeur.getById(req.params.id);
  if (!professeur) return res.status(404).send("Professeur not found");
  res.send(professeur);
});

// Insert a new professeur
router.post(
  "/",
  AdminChefVerifyProfInsert,
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("nom").isString(),
  ],
  async (req, res) => {
    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let _professeur = await Professeur.getByEmail(req.body.email);
    if (_professeur)
      return res.status(400).send({ message: "Email already exists" });

    req.body.password = await bcrypt.hash(req.body.password, 10);
    const professeur = await Professeur.insert(req.body);

    if (req.body.id_departement != "")
      Departement.addProfesseur(req.body.id_departement, professeur._id);
    res.send(professeur);
  }
);

// Update an existing professeur
router.put(
  "/:id",
  AdminChefVerifyProfInsert,
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("nom").isString(),
  ],
  async (req, res) => {
    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const professeur = await Professeur.getById(req.params.id);
    if (!professeur) return res.status(404).send("Professeur not found");

    const updatedProfesseur = await Professeur.update(req.params.id, req.body);
    res.send(updatedProfesseur);
  }
);

// Delete a specific professeur by id
router.delete("/:id", AdminChefVerifyProfDelete, async (req, res) => {
  const professeur = await Professeur.getById(req.params.id);
  if (!professeur) return res.status(404).send("Professeur not found");

  await Professeur.remove(req.params.id);
  res.send({ message: "Professeur deleted successfully" });
});
//get professeur by deparetement id
router.get("/departement/:id", async (req, res) => {
  const professeurs = await Professeur.getByDepartement(req.params.id);
  res.send(professeurs);
});


module.exports = router;
