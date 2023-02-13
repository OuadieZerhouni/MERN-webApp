const express=require('express');
const router = express.Router();

const Filiere=require('../Services/Filiere');
const Professeur=require('../Services/Professeur');
const Departement=require('../Services/Departement');
const Reunion=require('../Services/Reunion');

const verifyToken=(req,res,next)=>{
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}
router.use(verifyToken);

/*-------departement-------*/
router.post('/insert/departement',async (req,res)=>{
    const departement=await Departement.insert(req.body);
    req.body.professeurs.forEach(async (prof)=>{
        await Professeur.setIdDepartement(prof,departement._id);
    })
    res.send(departement);
});

router.post('/get/departement/all',async (req,res)=>{
    const departement=await Departement.getAll();
    res.send(departement);
})

router.post('/delete/departement',async (req,res)=>{
    const departement=await Departement.delete(req.body._id);
    res.send(departement);
})
router.post('/update/departement',async (req,res)=>{
    const departement=await Departement.update(req.body._id,req.body);
    console.log(req.body);
    res.send(departement);
})
router.post('/get/departement/id',async (req,res)=>{
    const departement=await Departement.getById(req.body._id);
    res.send(departement);
})
router.post('/get/departement/nom',async (req,res)=>{
    const departement=await Departement.getByNom(req.body.Nom);
    res.send(departement);
})

/*-------filiere-------*/
router.post('/insert/filiere',async (req,res)=>{
    const filiere=await Filiere.insert(req.body);
    res.send(filiere);
})
router.post('/get/filiere/all',async (req,res)=>{
    const filiere=await Filiere.getAll();
    res.send(filiere);
})
router.post('/delete/filiere',async (req,res)=>{
    const filiere=await Filiere.delete(req.body._id);
    res.send(filiere);
})
router.post('/update/filiere',async (req,res)=>{
    const filiere=await Filiere.update(req.body._id,req.body);
    res.send(filiere);
})
router.post('/get/filiere/id',async (req,res)=>{
    const filiere=await Filiere.getById(req.body._id);
    res.send(filiere);
})
router.post('/get/filiere/nom',async (req,res)=>{
    const filiere=await Filiere.getByNom(req.body.Nom);
    res.send(filiere);
})
router.post('/get/filiere/departement',async (req,res)=>{
    const filiere=await Filiere.getByDepartement(req.body.id_Departement);
    res.send(filiere);
})
/*-------Options-------*/
router.post('/get/options',async (req,res)=>{
    const options=await Filiere.getOptionById(req.body._id);
    res.send(options);
})
router.post('/insert/options',async (req,res)=>{
    const options=await Filiere.insertOptions(req.body);
    res.send(options);
})
router.post('/get/options/Filiere',async (req,res)=>{
    const options=await Filiere.getOptionsByFiliereId(req.body._id);
    res.send(options);
})
router.post('/delete/options',async (req,res)=>{
    const options=await Filiere.deleteOptions(req.body._id);
    res.send(options);
})
router.post('/update/options',async (req,res)=>{
    const options=await Filiere.updateOptions(req.body._id,req.body);
    res.send(options);
})

/*---- emploi du temps------*/
router.post('/get/emploiTemps/option',async (req,res)=>{
    const emploiTemps=await Filiere.getEmploiTempsByOptionId(req.body.option_id);
    res.send(emploiTemps);
})
router.post('/insert/emploiTemps',async (req,res)=>{
    const emploiTemps=await Filiere.insertEmploiTemps(req.body.option_id,req.body.emploiTemps);
    res.send(emploiTemps);
})
router.post('/delete/emploiTemps',async (req,res)=>{
    const emploiTemps=await Filiere.deleteEmploiTemps(req.body.option_id,req.body.emploiTemps);
    res.send(emploiTemps);
})
router.post('/update/emploiTemps',async (req,res)=>{
    const emploiTemps=await Filiere.updateEmploiTemps(req.body.option_id,req.body.emploiTemps);
    res.send(emploiTemps);
})

/*-------professeur-------*/
router.post('/insert/professeur',async (req,res)=>{
    const professeur=await Professeur.insert(req.body);
    Departement.addProfesseur(req.body.id_departement,professeur._id);

    res.send(professeur);
});
router.post('/get/professeur/all',async (req,res)=>{
    const professeur=await Professeur.getAll();
    res.send(professeur);
})
router.post('/delete/professeur',async (req,res)=>{
    const professeur=await Professeur.delete(req.body._id);
    res.send(professeur);
})
router.post('/update/professeur',async (req,res)=>{
    const professeur=await Professeur.update(req.body._id,req.body);
    res.send(professeur);
})
router.post('/get/professeur/id',async (req,res)=>{
    const professeur=await Professeur.getById(req.body._id);
    res.send(professeur);
})
router.post('/get/professeur/nom',async (req,res)=>{
    const professeur=await Professeur.getByFullName(req.body.Nom);
    res.send(professeur);
})
router.post('/get/professeur/email',async (req,res)=>{
    const professeur=await Professeur.getByEmail(req.body.Email);
    res.send(professeur);
})
router.post('/get/professeur/departement',async (req,res)=>{
    const professeur=await Professeur.getByDepartement(req.body._id);
    res.send(professeur);
})


/*---reunion---*/
router.post('/insert/reunion',async (req,res)=>{
    const reunion=await Reunion.insert(req.body);
    res.send(reunion);
})
router.post('/get/reunion/all',async (req,res)=>{
    const reunion=await Reunion.getAll();
    res.send(reunion);
})
router.post('/delete/reunion',async (req,res)=>{
    const reunion=await Reunion.delete(req.body._id);
    res.send(reunion);
})
router.post('/update/reunion',async (req,res)=>{
    const reunion=await Reunion.update(req.body._id,req.body);
    res.send(reunion);
})
router.post('/get/reunion/id',async (req,res)=>{
    const reunion=await Reunion.getById(req.body._id);
    res.send(reunion);
})
router.post('/get/reunion/Date',async (req,res)=>{
    const reunion=await Reunion.getByDate(req.body.Date);
    res.send(reunion);
})
router.post('/get/reunion/departement',async (req,res)=>{
    const reunion=await Reunion.getByDepartement(req.body.id_Departement);
    res.send(reunion);
})
/*----PV-----*/
router.post('/insert/pv',async (req,res)=>{
    const pv=await Reunion.insertPV(req.body.reunion_id,req.body.pv);
    res.send(pv);
})
router.post('/get/pv',async (req,res)=>{
    const pv=await Reunion.getPV(req.body.reunion_id);
    res.send(pv);
})
router.post('/delete/pv',async (req,res)=>{
    const pv=await Reunion.deletePV(req.body.reunion_id);
    res.send(pv);
})
router.post('/update/pv',async (req,res)=>{
    const pv=await Reunion.updatePV(req.body.reunion_id,req.body.pv);
    res.send(pv);
})

/*----commentaire----*/
router.post('/insert/comment',async (req,res)=>{
    const comment=await Reunion.AddComment(req.body.reunion_id,req.body.comment);
    res.send(comment);
})
router.post('/get/comment',async (req,res)=>{
    const comment=await Reunion.getCommentsByPV(req.body.reunion_id,req.body.pv_id);
    res.send(comment);
})
router.post('/delete/comment',async (req,res)=>{
    const comment=await Reunion.deleteComment(req.body.reunion_id,req.body.pv_id,req.body.comment_id);
    res.send(comment);
})
router.post('/update/comment',async (req,res)=>{
    const comment=await Reunion.updateComment(req.body.reunion_id,req.body.pv_id,req.body.comment_id,req.body.comment);
    res.send(comment);
})
module.exports=router;



