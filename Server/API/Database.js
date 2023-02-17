const express=require('express');
const router = express.Router();

const FiliereRouter=require('../Routes/Filiere');
const OptionRouter=require('../Routes/Option');
const ProfesseurRouter=require('../Routes/Professeur');
const DepartementRouter=require('../Routes/Departement');
const EmploiTempsRouter=require('../Routes/EmploiTemps');



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

router.use('/filiere',FiliereRouter);
router.use('/option',OptionRouter);
router.use('/professeur',ProfesseurRouter);
router.use('/departement',DepartementRouter);
router.use('/emploiTemps',EmploiTempsRouter);



module.exports=router;



