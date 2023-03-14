const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Reunion = require("../Services/Reunion");
const PV_Upload = require('../util/Fileupload').PV_Upload;
const pdfToImages = require("../util/ToPDF").pdfToImages;
const AdminChefVerifyProfInsert = require('../util/verification').AdminChefVerifyProfInsert;
const AdminChefVerifyReunionDelete = require('../util/verification').AdminChefVerifyReunionDelete;
const jwt = require('jsonwebtoken');

// GET all reunions
router.get('/', async (req, res) => {
  try {
    const reunion = await Reunion.getAll();
    res.send(reunion);
  } catch (err) {
    console.log(err);
    res.status(500).send({error:"err.message"});
  }
});

// GET reunion by id
router.get('/:id', async (req, res) => {
  try {
    const reunion = await Reunion.getById(req.params.id);
    res.send(reunion);
  } catch (err) {
    console.log(err);
    res.status(500).send({error:"err.message"});
  }
});

// GET reunion by date
router.get('/date/:date', async (req, res) => {
  try {
    const reunion = await Reunion.getByDate(req.params.date);
    res.send(reunion);
  } catch (err) {
    console.log(err);
    res.status(500).send({error:"err.message"});
  }
});

// GET reunion by department
router.get('/department/:id', async (req, res) => {
  try {
    const reunion = await Reunion.getByDepartement(req.params.id);
    res.send(reunion);
  } catch (err) {
    console.log(err);
    res.status(500).send({error:"err.message"});
  }
});

// GET reunion PV
router.get('/PV/:id', async (req, res) => {
  try {
    const PV = await Reunion.getPV(req.params.id);

    const filePath = PV.link;
    const imageDirPath = path.resolve(filePath.replace('.pdf', ''));

    let Path=`${ imageDirPath}\\images`
    const files = fs.readdirSync(Path);

    const numPages = files.filter(file => file.endsWith('.png')).length;
    let _path='http://localhost:3001/'+path.relative(__dirname, imageDirPath).replace(/\\/g, '/')+'/images';

    // Send the image directory path and the number of images
    res.send({
      path: _path,
      numPages: numPages
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({error:"err.message"});
  }
});

// POST a new reunion
router.post(
  '/',
  PV_Upload.single('file'),
  AdminChefVerifyProfInsert,
  async (req, res) => {
    try {
      let present_prof = [];
      if (req.body.prof_present != '') {
        present_prof = req.body.prof_present.split(',');
      }
      let loj = [];
      if (req.body.LOJ != '') {
        loj = req.body.LOJ.split(',');
      }

      pdfToImages(req.file.path).then(async (_pdfPath) => {
        const reunionData = {
          Date: req.body.Date,
          Lieu: req.body.Lieu,
          id_departement: req.body.id_departement,
          LOJ: loj,
          prof_present: present_prof,
          PV: {
            link: _pdfPath,
            date_creation: Date.now(),
            comments: []
          }
        };
        const reunion = await Reunion.insert(reunionData);
        res.status(201).send(reunion);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({error:"err.message"});
    }
  }
);

// PUT update an existing reunion
router.put(
  '/:id',
  PV_Upload.single('file'),
  AdminChefVerifyProfInsert,
  async (req, res) => {
    try {
      console.log(req.params.id);
      req.body.prof_present = JSON.parse(req.body.prof_present);
      req.body.LOJ = JSON.parse(req.body.LOJ);
      const reunion = await Reunion.update(req.params.id, req.body);
      res.send(reunion);
    } catch (err) {
      console.log(err);
      res.status(500).send({error:"err.message"});
    }
  }
);

// DELETE a reunion
router.delete('/:id', AdminChefVerifyReunionDelete, async (req, res) => {
  try {const reunion = await Reunion.remove(req.params.id);
    res.status(200).send(reunion);
  } catch (err) {
    console.log(err);
    res.status(500).send({error:"err.message"});
  }
});

// POST a comment
router.post('/:id/comments', async (req, res) => {
  try{
    const comment = await Reunion.AddComment(req.params.id, req.body.comment);
    res.status(201).send(comment);
  }catch (err) {
    console.log(err);
    res.status(500).send({error:"err.message"});
  }
});

// GET all comments for a reunion PV
router.get('/:id/comments', async (req, res) => {
  try{
    const comment = await Reunion.getCommentsByPV(req.params.id, req.query.pv_id);
    res.send(comment);
  }catch (err) {
    console.log(err );
    res.status(500).send({error:"Loading Comments Failed"});
  }
});

// DELETE a comment
router.delete('/:id/comments', async (req, res) => {
  try{
    const comment = await Reunion.RemoveComment(req.params.id, req.query.pv_id, req.query.comment_id);
    res.status(200).send(comment);
  }catch (err) {
    console.log(err);
    res.status(500).send({error:"Deleting Comment Failed"});

  }
});




module.exports = router;
