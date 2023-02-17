const express=require('express');
const router = express.Router();
const Filiere=require("../Services/Filiere")


router.post('/get',async (req,res)=>{
    const options=await Filiere.getOptionById(req.body._id);
    res.send(options);
})
router.post('/insert',async (req,res)=>{
    const options=await Filiere.insertOptions(req.body);
    res.send(options);
})
router.post('/get/Filiere',async (req,res)=>{
    const options=await Filiere.getOptionsByFiliereId(req.body._id);
    res.send(options);
})
router.post('/delete',async (req,res)=>{
    const options=await Filiere.deleteOptions(req.body._id);
    res.send(options);
})
router.post('/update',async (req,res)=>{
    const options=await Filiere.updateOptions(req.body._id,req.body);
    res.send(options);
})

module.exports=router;
