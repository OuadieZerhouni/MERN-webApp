const express=require('express');
const app=express();
const Filiere=require('../Models/Filiere');
const Professeur=require('../Models/Professeur');
const Departement=require('../Models/Departement');
const Reunion=require('../Models/Reunion');

/*-------departement-------*/
app.post('/insert/departement',async (req,res)=>{
    const departement=await Departement.insert(req.body);
    res.send("Inserted !");
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
    res.send("departement");
})
app.post('/get/departement/id',async (req,res)=>{
    const departement=await Departement.getById(req.body._id);
    res.send(departement);
})
app.post('/get/departement/nom',async (req,res)=>{
    const departement=await Departement.getByNom(req.body.Nom);
    res.send(departement);
})

/*-------filiere-------*/
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
/*-------Options-------*/
app.post('/get/options',async (req,res)=>{
    const options=await Filiere.getOptionById(req.body._id);
    res.send(options);
})
app.post('/insert/options',async (req,res)=>{
    const options=await Filiere.insertOptions(req.body);
    res.send(options);
})
app.post('/get/options/Filiere',async (req,res)=>{
    const options=await Filiere.getOptionsByFiliereId(req.body._id);
    res.send(options);
})
app.post('/delete/options',async (req,res)=>{
    const options=await Filiere.deleteOptions(req.body._id);
    res.send(options);
})
app.post('/update/options',async (req,res)=>{
    const options=await Filiere.updateOptions(req.body._id,req.body);
    res.send(options);
})

//CRUD emploi du temps
app.post('/get/emploiTemps/option',async (req,res)=>{
    const emploiTemps=await Filiere.getEmploiTempsByOptionId(req.body.option_id);
    res.send(emploiTemps);
})
app.post('/insert/emploiTemps',async (req,res)=>{
    const emploiTemps=await Filiere.insertEmploiTemps(req.body.option_id,req.body.emploiTemps);
    res.send(emploiTemps);
})
app.post('/delete/emploiTemps',async (req,res)=>{
    const emploiTemps=await Filiere.deleteEmploiTemps(req.body.option_id,req.body.emploiTemps);
    res.send(emploiTemps);
})
app.post('/update/emploiTemps',async (req,res)=>{
    const emploiTemps=await Filiere.updateEmploiTemps(req.body.option_id,req.body.emploiTemps);
    res.send(emploiTemps);
})

/*-------professeur-------*/
app.post('/insert/professeur',async (req,res)=>{
    const professeur=await Professeur.insert(req.body);
    res.send(professeur);
});
app.post('/get/professeur/all',async (req,res)=>{
    const professeur=await Professeur.getAll();
    res.send(professeur);
})
app.post('/delete/professeur',async (req,res)=>{
    const professeur=await Professeur.delete(req.body._id);
    res.send(professeur);
})
app.post('/update/professeur',async (req,res)=>{
    const professeur=await Professeur.update(req.body._id,req.body);
    res.send(professeur);
})
app.post('/get/professeur/id',async (req,res)=>{
    const professeur=await Professeur.getById(req.body._id);
    res.send(professeur);
})
app.post('/get/professeur/nom',async (req,res)=>{
    const professeur=await Professeur.getByFullName(req.body.Nom);
    res.send(professeur);
})
app.post('/get/professeur/email',async (req,res)=>{
    const professeur=await Professeur.getByEmail(req.body.Email);
    res.send(professeur);
})
app.post('/get/professeur/phone',async (req,res)=>{
    const professeur=await Professeur.getByPhoneNumber(req.body.Phone);
    res.send(professeur);
})

/*---reunion---*/
app.post('/insert/reunion',async (req,res)=>{
    const reunion=await Reunion.insert(req.body);
    res.send(reunion);
})
app.post('/get/reunion/all',async (req,res)=>{
    const reunion=await Reunion.getAll();
    res.send(reunion);
})
app.post('/delete/reunion',async (req,res)=>{
    const reunion=await Reunion.delete(req.body._id);
    res.send(reunion);
})
app.post('/update/reunion',async (req,res)=>{
    const reunion=await Reunion.update(req.body._id,req.body);
    res.send(reunion);
})
app.post('/get/reunion/id',async (req,res)=>{
    const reunion=await Reunion.getById(req.body._id);
    res.send(reunion);
})
app.post('/get/reunion/Date',async (req,res)=>{
    const reunion=await Reunion.getByDate(req.body.Date);
    res.send(reunion);
})
app.post('/get/reunion/departement',async (req,res)=>{
    const reunion=await Reunion.getByDepartement(req.body.id_Departement);
    res.send(reunion);
})
//CRUD pv
app.post('/insert/pv',async (req,res)=>{
    const pv=await Reunion.insertPV(req.body.reunion_id,req.body.pv);
    res.send(pv);
})
app.post('/get/pv',async (req,res)=>{
    const pv=await Reunion.getPV(req.body.reunion_id);
    res.send(pv);
})
app.post('/delete/pv',async (req,res)=>{
    const pv=await Reunion.deletePV(req.body.reunion_id);
    res.send(pv);
})
app.post('/update/pv',async (req,res)=>{
    const pv=await Reunion.updatePV(req.body.reunion_id,req.body.pv);
    res.send(pv);
})

//crud comment
app.post('/insert/comment',async (req,res)=>{
    const comment=await Reunion.AddComment(req.body.reunion_id,req.body.comment);
    res.send(comment);
})
app.post('/get/comment',async (req,res)=>{
    const comment=await Reunion.getCommentsByPV(req.body.reunion_id,req.body.pv_id);
    res.send(comment);
})
app.post('/delete/comment',async (req,res)=>{
    const comment=await Reunion.deleteComment(req.body.reunion_id,req.body.pv_id,req.body.comment_id);
    res.send(comment);
})
app.post('/update/comment',async (req,res)=>{
    const comment=await Reunion.updateComment(req.body.reunion_id,req.body.pv_id,req.body.comment_id,req.body.comment);
    res.send(comment);
})

module.exports=app;






