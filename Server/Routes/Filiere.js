// const express=require('express');
// const router = express.Router();
// const Filiere=require('../Services/');
// const AdminChefVerifyProfInsert=require('../util/verification').AdminChefVerifyProfInsert;
// const AdminChefVerifyoptionInsert=require('../util/verification').AdminChefVerifyoptionInsert;

// router.post('/insert',AdminChefVerifyProfInsert,async (req,res)=>{
//     const filiere=await Filiere.insert(req.body);
//     res.send(filiere);
// })
// router.post('/get/all',async (req,res)=>{
//     const filiere=await Filiere.getAll();
//     res.send(filiere);
// })
// router.post('/delete',AdminChefVerifyoptionInsert,async (req,res)=>{
//     const filiere=await Filiere.remove(req.body._id);
//     res.send(filiere);
// })
// router.post('/update'
// ,AdminChefVerifyProfInsert
// ,async (req,res)=>{
//     const filiere=await Filiere.update(req.body._id,req.body);
//     res.send(filiere);
// })
// router.post('/get/id',async (req,res)=>{
//     const filiere=await Filiere.getById(req.body._id);
//     res.send(filiere);
// })
// router.post('/get/nom',async (req,res)=>{
//     const filiere=await Filiere.getByNom(req.body.Nom);
//     res.send(filiere);
// })
// router.post('/get/departement',async (req,res)=>{
//     const filiere=await Filiere.getByDepartement(req.body.id_Departement);
//     res.send(filiere);
// })

// module.exports=router;
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Filiere = require('../Services/Filiere');

// Insert a new filiere
router.post('/', [
  body('nom').not().isEmpty().trim().escape(),
  body('description').optional({ nullable: true }).trim().escape(),
  body('departement').not().isEmpty().trim().escape(),
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

// Update filiere
router.put('/:id', [
  body('nom').not().isEmpty().trim().escape(),
  body('description').optional({ nullable: true }).trim().escape(),
  body('departement').not().isEmpty().trim().escape(),
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
