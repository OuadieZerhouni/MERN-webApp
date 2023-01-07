const express=require('express');
const app=express();
const Filiere=require('../Models/Filiere');
const Professeur=require('../Models/Professeur');
const Departement=require('../Models/Departement');


app.post('/insert/departement',async (req,res)=>{
    const departement=await Departement.insert(req.body);
    res.send(departement);
});

app.post('/get/departement',async (req,res)=>{
    const departement=await Departement.getAll();
    res.send(departement);
})

app.post('/insert/filiere',async (req,res)=>{
    const filiere=await Filiere.insert(req.body);
    res.send(filiere);
}
);

app.post('/get/filiere',async (req,res)=>{
    const filiere=await Filiere.getAll();
    res.send(filiere);
});

app.post('/insert/professeur',async (req,res)=>{
    const professeur=await Professeur.insert(req.body);
    res.send(professeur);
});



