const express=require('express');
const router = express.Router();
const Departement=require('../Services/Departement');

router.post('/insert',async (req,res)=>{
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

router.post('/delete',async (req,res)=>{
    const departement=await Departement.delete(req.body._id);
    res.send(departement);
})
router.post('/update',async (req,res)=>{
    const departement=await Departement.update(req.body._id,req.body);
    console.log(req.body);
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