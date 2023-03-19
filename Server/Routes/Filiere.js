
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Filiere = require('../Services/Filiere');
const verifyToken = require('../util/verification').verifyToken;




// Get all filieres
router.get('/', async (req, res) => {
  try {
    const filieres = await Filiere.getAll();
    res.status(200).json(filieres);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get filiere by id
router.get('/:id', async (req, res) => {
  try {
    const filiere = await Filiere.getById(req.params.id);
    if (!filiere) {
      return res.status(404).json({ msg: 'Filiere not found' });
    }
    res.status(200).json(filiere);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.use(verifyToken);


// Update filiere
router.put('/:id', [
  body('Nom').not().isEmpty().trim().escape(),
  body('Description').optional({ nullable: true }).trim().escape(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const filiere = await Filiere.update(req.params.id, req.body);
    if (!filiere) {
      return res.status(404).json({ msg: 'Filiere not found' });
    }
    res.status(200).json(filiere);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
router.post('/', [
  body('Nom').not().isEmpty().trim().escape(),
  body('Description').optional({ nullable: true }).trim().escape(),
  body('id_departement').not().isEmpty().trim().escape(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const filiere = await Filiere.insert(req.body);
    res.status(201).json(filiere);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// Delete filiere
router.delete('/:id', async (req, res) => {
  try {
    const filiere = await Filiere.remove(req.params.id);
    if (!filiere) {
      return res.status(404).json({ msg: 'Filiere not found' });
    }
    res.status(200).json({ msg: 'Filiere deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
