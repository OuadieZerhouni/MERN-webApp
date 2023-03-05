// const express=require('express');
// const router = express.Router();
// const Departement=require('../Services/Departement');
// const Professeur=require('../Services/Professeur');
// const AdminVerify=require('../util/verification').AdminVerify;
// const AdminChefVerify=require('../util/verification').AdminChefVerifyDepart;

// router.post('/insert',AdminVerify,async (req,res)=>{
//     const departement=await Departement.insert(req.body);
//     req.body.professeurs.forEach(async (prof)=>{
//         await Professeur.setIdDepartement(prof,departement._id);
//     })
//     res.send(departement);
// });

// router.post('/get/all',async (req,res)=>{
//     const departement=await Departement.getAll();
//     res.send(departement);
// })

// router.post('/delete',AdminVerify,async (req,res)=>{
//     const departement=await Departement.remove(req.body._id);
//     res.send(departement);
// })
// router.post('/update',AdminChefVerify,async (req,res)=>{
//     const departement=await Departement.update(req.body._id,req.body);
//     res.send(departement);
// })
// router.post('/get/id',async (req,res)=>{
//     const departement=await Departement.getById(req.body._id);
//     res.send(departement);
// })
// router.post('/get/nom',async (req,res)=>{
//     const departement=await Departement.getByNom(req.body.Nom);
//     res.send(departement);
// })

// module.exports=router;
const express = require('express');
const router = express.Router();
const Departement = require('../Services/Departement');
const Professeur = require('../Services/Professeur');
const { body, validationResult } = require('express-validator');
const AdminVerify = require('../util/verification').AdminVerify;
const AdminChefVerify = require('../util/verification').AdminChefVerifyDepart;

// Create a departement
router.post('/', AdminVerify, [
  body('Nom').notEmpty().withMessage('Nom is required'),
  body('professeurs').notEmpty().withMessage('professeurs is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const departement = await Departement.insert(req.body);
  req.body.professeurs.forEach(async (prof) => {
    await Professeur.setIdDepartement(prof, departement._id);
  });
  res.status(201).json(departement);
});

// Retrieve all departements
router.get('/', async (req, res) => {
  const departements = await Departement.getAll();
  res.status(200).json(departements);
});

// Retrieve a specific departement by ID
router.get('/:id', async (req, res) => {
  const departement = await Departement.getById(req.params.id);
  if (!departement) {
    return res.status(404).json({ message: 'Departement not found' });
  }
  res.status(200).json(departement);
});

// Retrieve a specific departement by Nom
router.get('/search', async (req, res) => {
  const departement = await Departement.getByNom(req.query.Nom);
  if (!departement) {
    return res.status(404).json({ message: 'Departement not found' });
  }
  res.status(200).json(departement);
});

// Update a departement by ID
router.put('/:id', AdminChefVerify, [
  body('Nom').notEmpty().withMessage('Nom is required'),
  body('professeurs').notEmpty().withMessage('professeurs is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const departement = await Departement.update(req.params.id, req.body);
  if (!departement) {
    return res.status(404).json({ message: 'Departement not found' });
  }
  res.status(200).json(departement);
});

// Delete a departement by ID
router.delete('/:id', AdminVerify, async (req, res) => {
  const departement = await Departement.remove(req.params.id);
  if (!departement) {
    return res.status(404).json({ message: 'Departement not found' });
  }
  res.status(200).json({ message: 'Departement deleted successfully' });
});

module.exports = router;
