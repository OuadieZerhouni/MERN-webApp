const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const professeur = require("../Services/Professeur");

const app = express();

app.use(express.json());
//recive the request from '/' and take email and password and verify them
app.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await professeur.getByEmail(email);
  const admin_email = process.env.ADMIN_EMAIL;
  console.log(admin_email);
  if (email == admin_email) {
    const admin_password = process.env.ADMIN_PASSWORD;
    if (password == admin_password) {
      const token = jwt.sign({ user: "admin" }, process.env.SECRET_KEY);
      res.header("token", token);
      res.send({role:"Admin"});
    } else {
      res.send({error:"password is wrong"});
    }
  } else if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY);
      res.header("token", token);
      res.send({role:"Professeur"});
    } else {
      res.send({error:"password is wrong"});
    }
  } else {
    res.send({error:"Email  is wrong"});
  }
});

module.exports = app;
