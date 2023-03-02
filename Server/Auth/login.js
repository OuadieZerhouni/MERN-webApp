const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const professeur = require("../Services/Professeur");
const Admin = require("../Services/Admin");
const Departement = require("../Services/Departement");

const app = express();

app.use(express.json());
//recive the request from '/' and take email and password and verify them
app.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await professeur.getByEmail(email);
  const admin = await Admin.getByEmail(email);

  if (admin) {
    if (await bcrypt.compare(password, admin.password)) {
      const token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY);
      res.send({ "token":token});
    } else {
      res.send({ error: "password is wrong" });
    }
  } else if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const depart =await Departement.IsChef(user._id);
      if (depart ) {
        const token = jwt.sign(
          { role: "chef",user:user._id, departement: depart._id },
          process.env.SECRET_KEY
        );
        res.send({ "token":token,depart:depart});
      } else {
        const token = jwt.sign({ role:'prof',user:user._id}, process.env.SECRET_KEY);
        res.send({ "token":token});
      }
    } else {
      res.send({ error: "password is wrong" });
    }
  } else {
    res.send({ error: "Email  is wrong" });
  }
});

module.exports = app;
