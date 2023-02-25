const express=require('express');
const router = express.Router();
const path=require('path');
const fs=require('fs');
const Reunion=require("../Services/Reunion")
const PV_Upload=require('../util/Fileupload').PV_Upload;
const pdfToImages = require("../util/ToPDF").pdfToImages;





/*---reunion---*/ 
router.post('/insert',PV_Upload.single('file'),async (req,res)=>{

    let present_prof=[]
    if(req.body.prof_present!=''){
    present_prof=req.body.prof_present.split(',') }
    let loj=[]
    if(req.body.LOJ!=''){
    loj=req.body.LOJ.split(',') }
    console.log(req.body.id_departement)

    pdfToImages(req.file.path).then(async(_pdfPath) => {
    const reunionData={
        Date:req.body.Date,
        Lieu:req.body.Lieu,
        id_departement:req.body.id_departement,
        LOJ:loj,
        prof_present:present_prof,
        PV:{
            link:_pdfPath,
            date_creation:Date.now(),
            comments:[]
        }  }
    const reunion=await Reunion.insert(reunionData);
    res.send(reunion);
    })
})
router.post('/PV',async (req,res)=>{
    try{
        const PV= await Reunion.getPV(req.body._id);
    
      const filePath = PV.link;
      const imageDirPath = path.resolve(filePath.replace(".pdf", ""));
      
     
      let Path=`${ imageDirPath}\\images`
      const files = fs.readdirSync(Path);
    
      const numPages = files.filter(file => file.endsWith(".png")).length;
      let _path="http://localhost:3001/"+path.relative(__dirname, imageDirPath).replace(/\\/g, "/")+"/images";
    
      // Send the image directory path and the number of images
      res.send({ 
        path: _path,
        numPages: numPages
      });
    
    }
    catch(err){
      console.log("Error: "+err);
      res.status(500).send(err);
    }
    });

router.post('/get/all',async (req,res)=>{
    const reunion=await Reunion.getAll();
    res.send(reunion);
})
router.post('/delete',async (req,res)=>{
    const reunion=await Reunion.delete(req.body._id);
    res.send(reunion);
})
router.post('/update',async (req,res)=>{
    const reunion=await Reunion.update(req.body._id,req.body);
    res.send(reunion);
})
router.post('/get/id',async (req,res)=>{
    const reunion=await Reunion.getById(req.body._id);
    res.send(reunion);
})
router.post('/get/Date',async (req,res)=>{
    const reunion=await Reunion.getByDate(req.body.Date);
    res.send(reunion);
})
router.post('/get/departement',async (req,res)=>{
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