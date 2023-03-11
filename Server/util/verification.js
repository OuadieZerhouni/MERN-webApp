const jwt = require("jsonwebtoken");
const ProfesseurService = require("../Services/Professeur");
const Reunionservice = require("../Services/Reunion");
const FiliereService = require("../Services/Filiere");

exports.AdminVerify = (req, res, next) => {
  const token = req.token || req.headers["authorization"].split(" ")[1];
  if (token) {
    if (jwt.decode(token).role === "admin") {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};

exports.AdminChefVerifyDepart = (req, res, next) => {
  const token = req.token || req.headers["authorization"].split(" ")[1];
  if (token) {
    if (jwt.decode(token).role === "admin") {
      next();
    } else if (
      jwt.decode(token).role === "chef" &&
      req.body._id == jwt.decode(token).departement
    ) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};
exports.verifyToken = (req, res, next) => {
try {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1] || bearer[0];
    const role = jwt.decode(bearerToken).role;
    if (role !== "admin" && role !== "prof" && role !== "chef") {
      res.sendStatus(403);
    }
    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
} catch (error) {
  res.sendStatus(403);
  console.log(error);
}
};

exports.AdminChefVerifyProfInsert = (req, res, next) => {
  const token = req.token;
  console.log(req.body);
  if (jwt.decode(token).role == "admin") next();
  else if (
    jwt.decode(token).role == "chef" &&
    req.body.id_departement == jwt.decode(token).departement
  ) {
    next();
  } else res.sendStatus(403);
};
exports.AdminChefVerifyProfDelete = async (req, res, next) => {
  const token = req.token;
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  const Prof = await ProfesseurService.getById(req.body._id);
  if (jwt.decode(token).role == "admin") next();
  else if (
    jwt.decode(token).role == "chef" &&
    jwt.decode(token).departement == Prof.id_departement
  )
    next();
  else
    return res.status(403).send({ auth: false, message: "No token provided." });
};

exports.AdminChefVerifyReunionDelete = async (req, res, next) => {
  const token = req.token || req.headers["authorization"].split(" ")[1];

  if (!token) {
    res.status(403).send("you are not allowed to do this action");
    return;
  }
  const reunion = await Reunionservice.getById(req.body._id);
  if (jwt.decode(token).role === "admin") {
    next();
  } else if (
    jwt.decode(token).role === "chef" &&
    jwt.decode(token).departement == reunion.id_departement
  ) {
    next();
  } else {
    res.status(403).send("you are not allowed to do this action");
  }
};

exports.AdminChefVerifyoptionInsert = async (req, res, next) => {
  try {
    const filiere = await FiliereService.getById(req.body._id);
    const token = req.token || req.headers["authorization"].split(" ")[1];
    
    if (jwt.decode(token).role === "admin") {
      next();
    } else if (
      jwt.decode(token).role === "chef" &&
      filiere.id_departement == jwt.decode(token).departement
    ) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    console.log(err);
  }
};
exports.AdminChefVerifyoptionDelete = async (req, res, next) => {
  const filiereParent = await FiliereService.getByOptionId(req.body._id);
  const token=req.token || req.headers['autorization'].split(' ')[1];
  console.log(filiereParent);

  if(jwt.decode(token).role === "admin"){
    next();
  }else if(jwt.decode(token).role === "chef" && jwt.decode(token).departement == filiereParent.id_departement){

    next();
  }else{
    res.status(401).send("Unauthorized");
  }
};

  


