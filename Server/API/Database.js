const express=require('express');
const router = express.Router();

const verifyToken=require('../util/verification').verifyToken;

const FiliereRouter=require('../Routes/Filiere');
const OptionRouter=require('../Routes/Option');
const ProfesseurRouter=require('../Routes/Professeur');
const DepartementRouter=require('../Routes/Departement');
const ReunionRouter = require('../Routes/Reunion');
const EmploiTempsRouter=require('../Routes/EmploiTemps');





router.use(verifyToken);

router.use('/filiere',FiliereRouter);
router.use('/option',OptionRouter);
router.use('/professeur',ProfesseurRouter);
router.use('/departement',DepartementRouter);
router.use('/reunion',ReunionRouter)
router.use('/emploiTemps',EmploiTempsRouter);



module.exports=router;



