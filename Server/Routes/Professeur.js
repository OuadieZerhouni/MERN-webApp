const express=require('express');
const router = express.Router();
const Professeur=require('../Services/Professeur');




/*-------professeur-------*/
router.post('/insert',async (req,res)=>{
    const professeur=await Professeur.insert(req.body);
    Departement.addProfesseur(req.body.id_departement,professeur._id);

    res.send(professeur);
});
router.post('/get/all',async (req,res)=>{
    const professeur=await Professeur.getAll();
    res.send(professeur);
})
router.post('/delete',async (req,res)=>{
    const professeur=await Professeur.delete(req.body._id);
    res.send(professeur);
})
router.post('/update',async (req,res)=>{
    const professeur=await Professeur.update(req.body._id,req.body);
    res.send(professeur);
})
router.post('/get/id',async (req,res)=>{
    const professeur=await Professeur.getById(req.body._id);
    res.send(professeur);
})
router.post('/get/nom',async (req,res)=>{
    const professeur=await Professeur.getByFullName(req.body.Nom);
    res.send(professeur);
})
router.post('/get/email',async (req,res)=>{
    const professeur=await Professeur.getByEmail(req.body.Email);
    res.send(professeur);
})
router.post('/get/departement',async (req,res)=>{
    const professeur=await Professeur.getByDepartement(req.body._id);
    res.send(professeur);
})


module.exports=router;