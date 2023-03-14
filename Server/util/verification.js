const jwt = require("jsonwebtoken");
const ProfesseurService = require("../Services/Professeur");
const Reunionservice = require("../Services/Reunion");
const FiliereService = require("../Services/Filiere");

exports.AdminVerify = async (req, res, next) => {
  try {
    const token = req.token || req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken || decodedToken.role !== "admin") {
      throw new Error("Not authorized");
    }

    req.user = await Services.getProfesseurById(decodedToken.profId);

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
exports.AdminChefVerifyDepart = (req, res, next) => {
  const token = req.token || req.headers["authorization"].split(" ")[1];
  if (
    jwt.decode(token).role === "admin" ||
    (jwt.decode(token).role === "chef" &&
      req.body._id == jwt.decode(token).departement)
  ) {
    next();
  } else {
    res.sendStatus(403);
  }
};
exports.verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1] || bearer[0];
      const role = jwt.decode(bearerToken).role;
      if (role !== "admin" && role !== "prof" && role !== "chef") {
        return res.sendStatus(403);
      }
      req.token = bearerToken;
      next();
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};
exports.AdminChefVerifyProfInsert = (req, res, next) => {
  try {
    const token = req.token;
    if (jwt.decode(token).role == "admin") next();
    else if (
      jwt.decode(token).role == "chef" &&
      req.body.id_departement == jwt.decode(token).departement
    ) {
      next();
    } else res.sendStatus(403);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
exports.AdminChefVerifyProfDelete = async (req, res, next) => {
  try {
    const token = req.token;
    if (!token) throw new Error({ auth: false, message: "No token provided." });

    const Prof = await ProfesseurService.getById(req.body._id);
    if (jwt.decode(token).role == "admin") 
      next();
    else if (
      jwt.decode(token).role == "chef" &&
      jwt.decode(token).departement == Prof.id_departement
    )
      next();
    else
      throw new Error({ auth: false, message: "No token provided." });
  } catch (err) {
    console.log(err);
    res.status(403).send(err.message);
  }
};

exports.AdminChefVerifyReunionDelete = async (req, res, next) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
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
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
exports.AdminChefVerifyoptionDelete = async (req, res, next) => {
  try {
    const filiereParent = await FiliereService.getByOptionId(req.body._id);
    const token = req.token || req.headers["authorization"].split(" ")[1];

    if (jwt.decode(token).role === "admin") {
      next();
    } else if (
      jwt.decode(token).role === "chef" &&
      jwt.decode(token).departement == filiereParent.id_departement
    ) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({error: 'Internal server error.'});
  }
};

