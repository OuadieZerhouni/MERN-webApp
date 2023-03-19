const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Professeur = require("../Services/Professeur");
const Admin = require("../Services/Admin");
const Departement = require("../Services/Departement");

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Professeur.getByEmail(email);
    const admin = await Admin.getByEmail(email);

    if (!user && !admin) {
      throw new Error("Email not found");
    }

    const match = await bcrypt.compare(password, user?.password || admin?.password || '');

    if (!match) {
      throw new Error("Invalid password");
    }

    let token, depart;

    if (admin) {
      token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY);
    } else {
      depart = await Departement.IsChef(user._id);
      token = jwt.sign(
        { role: depart ? "chef" : "prof", user: user._id, departement: depart?._id },
        process.env.SECRET_KEY
      );
    }

    res.send({ token, depart });
  } catch (err) {
    console.error(err);
    res.status(401).send({ error: err.message });
  }
});

module.exports = app;