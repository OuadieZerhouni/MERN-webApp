const express=require('express');
const router = express.Router();
const Option=require("../Services/Option")



router.post('/get/option',async (req,res)=>{
    const emploiTemps=await Option.getEmploiTempsByOptionId(req.body.option_id);
    res.send(emploiTemps);
})
router.post('/insert',async (req,res)=>{
    const emploiTemps=await Option.insertEmploiTemps(req.body.option_id,req.body.emploiTemps);
    res.send(emploiTemps);
})
router.post('/delete',async (req,res)=>{
    const emploiTemps=await Option.deleteEmploiTemps(req.body.option_id,req.body.emploiTemps);
    res.send(emploiTemps);
})
router.post('/update',async (req,res)=>{
    const emploiTemps=await Option.updateEmploiTemps(req.body.option_id,req.body.emploiTemps);
    res.send(emploiTemps);
})

module.exports=router;
