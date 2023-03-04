const multer=require('multer');
const uuid =require('uuid').v4;
const path = require('path');


const Emploi_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/Emplois/xlsx/");
    },
    filename: function (req, file, cb) {
      const Id = uuid();
      const fileName = Id + path.extname(file.originalname);
      cb(null, fileName);
    },
  });
exports.Emploi_Upload = multer({ storage: Emploi_storage });

const PV_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/PVs')
    },
    filename: function (req, file, cb) {
        cb(null, uuid() +path.extname(file.originalname))
    }})


exports.PV_Upload = multer({ storage: PV_storage })

const Post_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/posts')
    }
    ,
    filename: function (req, file, cb) {
        cb(null, uuid() +path.extname(file.originalname))
    }
})

exports.Post_Upload = multer({ storage: Post_storage })