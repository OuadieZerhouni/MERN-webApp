const express=require('express');
const router = express.Router();
const Departement=require('../Services/Departement');
const Professeur=require('../Services/Professeur');
const AdminVerify=require('../util/verification').AdminVerify;
const AdminChefVerify=require('../util/verification').AdminChefVerifyDepart;

router.post('/insert',AdminVerify,async (req,res)=>{
    const departement=await Departement.insert(req.body);
    req.body.professeurs.forEach(async (prof)=>{
        await Professeur.setIdDepartement(prof,departement._id);
    })
    res.send(departement);
});

router.post('/get/all',async (req,res)=>{
    const departement=await Departement.getAll();
    res.send(departement);
})

router.post('/delete',AdminVerify,async (req,res)=>{
    const departement=await Departement.remove(req.body._id);
    res.send(departement);
})
router.post('/update',AdminChefVerify,async (req,res)=>{
    const departement=await Departement.update(req.body._id,req.body);
    res.send(departement);
})
router.post('/get/id',async (req,res)=>{
    const departement=await Departement.getById(req.body._id);
    res.send(departement);
})
router.post('/get/nom',async (req,res)=>{
    const departement=await Departement.getByNom(req.body.Nom);
    res.send(departement);
})

module.exports=router;