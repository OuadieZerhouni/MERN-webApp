const express=require('express');
const router = express.Router();
const Filiere=require('../Services/Filiere');
const AdminChefVerifyProfInsert=require('../util/verification').AdminChefVerifyProfInsert;
const AdminChefVerifyoptionInsert=require('../util/verification').AdminChefVerifyoptionInsert;

router.post('/insert',AdminChefVerifyProfInsert,async (req,res)=>{
    const filiere=await Filiere.insert(req.body);
    res.send(filiere);
})
router.post('/get/all',async (req,res)=>{
    const filiere=await Filiere.getAll();
    res.send(filiere);
})
router.post('/delete',AdminChefVerifyoptionInsert,async (req,res)=>{
    const filiere=await Filiere.remove(req.body._id);
    res.send(filiere);
})
router.post('/update'
,AdminChefVerifyProfInsert
,async (req,res)=>{
    const filiere=await Filiere.update(req.body._id,req.body);
    res.send(filiere);
})
router.post('/get/id',async (req,res)=>{
    const filiere=await Filiere.getById(req.body._id);
    res.send(filiere);
})
router.post('/get/nom',async (req,res)=>{
    const filiere=await Filiere.getByNom(req.body.Nom);
    res.send(filiere);
})
router.post('/get/departement',async (req,res)=>{
    const filiere=await Filiere.getByDepartement(req.body.id_Departement);
    res.send(filiere);
})

module.exports=router;