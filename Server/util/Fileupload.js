const multer=require('multer');
const uuid =require('uuid').v4;
const path = require('path');

const Emploi_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/Emplois/');
    },
    filename: function (req, file, cb) {
      const Id = uuid();
      const fileName = Id + path.extname(file.originalname);
      cb(null, fileName);
    },
  });
  
  const pdfFilter = function (req, file, cb) {
    const allowedMimes = ['application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb({ error: 'Wrong file type' }, false);
    }
  };

  ImageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
  exports.Emploi_Upload = multer({ 
    storage: Emploi_storage, 
    fileFilter: pdfFilter 
  });
  

const PV_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/PVs')
    },
    filename: function (req, file, cb) {
        cb(null, uuid() +path.extname(file.originalname))
    }})


exports.PV_Upload = multer({ storage: PV_storage ,fileFilter: pdfFilter})

const Post_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/posts')
    }
    ,
    filename: function (req, file, cb) {
        cb(null, uuid() +path.extname(file.originalname))
    }
})

exports.Post_Upload = multer({ storage: Post_storage ,fileFilter: ImageFilter})