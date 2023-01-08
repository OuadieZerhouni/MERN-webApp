const express=require('express');
const app=express();
const Filiere=require('../Models/Filiere');
const Professeur=require('../Models/Professeur');
const Departement=require('../Models/Departement');
const reunion=require('../Models/Reunion');

/*---departement---*/
app.post('/insert/departement',async (req,res)=>{
    const departement=await Departement.insert(req.body);
    res.send(departement);
});

app.post('/get/departement/all',async (req,res)=>{
    const departement=await Departement.getAll();
    res.send(departement);
})

app.post('/delete/departement',async (req,res)=>{
    const departement=await Departement.delete(req.body._id);
    res.send(departement);
})
app.post('/update/departement',async (req,res)=>{
    const departement=await Departement.update(req.body._id,req.body);
    res.send(departement);
})
app.post('/get/departement/id',async (req,res)=>{
    const departement=await Departement.getById(req.body._id);
    res.send(departement);
})
app.post('/get/departement/nom',async (req,res)=>{
    const departement=await Departement.getByNom(req.body.Nom);
    res.send(departement);
})

/*---filiere---*/
app.post('/insert/filiere',async (req,res)=>{
    const filiere=await Filiere.insert(req.body);
    res.send(filiere);
})
app.post('/get/filiere/all',async (req,res)=>{
    const filiere=await Filiere.getAll();
    res.send(filiere);
})
app.post('/delete/filiere',async (req,res)=>{
    const filiere=await Filiere.delete(req.body._id);
    res.send(filiere);
})
app.post('/update/filiere',async (req,res)=>{
    const filiere=await Filiere.update(req.body._id,req.body);
    res.send(filiere);
})
app.post('/get/filiere/id',async (req,res)=>{
    const filiere=await Filiere.getById(req.body._id);
    res.send(filiere);
})
app.post('/get/filiere/nom',async (req,res)=>{
    const filiere=await Filiere.getByNom(req.body.Nom);
    res.send(filiere);
})
app.post('/get/filiere/departement',async (req,res)=>{
    const filiere=await Filiere.getByDepartement(req.body.id_Departement);
    res.send(filiere);
})
/*---professeur---*/
app.post('/insert/professeur',async (req,res)=>{
    const professeur=await Professeur.insert(req.body);
    res.send(professeur);
});
/*---reunion---*/




