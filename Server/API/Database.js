const express=require('express');
const router = express.Router();

const verifyToken=require('../util/verification').verifyToken;

const FiliereRouter=require('../Routes/Filiere');
const OptionRouter=require('../Routes/Option');
const ProfesseurRouter=require('../Routes/Professeur');
const DepartementRouter=require('../Routes/Departement');
const ReunionRouter = require('../Routes/Reunion');
const EmploiTempsRouter=require('../Routes/EmploiTemps');
const PostRouter=require('../Routes/Post');





router.use('/post',PostRouter);
router.use(verifyToken);

router.use('/filieres',FiliereRouter);
router.use('/option',OptionRouter);
router.use('/professeurs',ProfesseurRouter);
router.use('/departements',DepartementRouter);
router.use('/reunion',ReunionRouter)
router.use('/emploiTemps',EmploiTempsRouter);




module.exports=router;



