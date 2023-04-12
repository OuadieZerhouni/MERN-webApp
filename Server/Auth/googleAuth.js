const passport = require("passport");
const express = require("express");
require("dotenv").config();
const router = express.Router();
const ProfesseurService = require("../Services/Professeur");
const DepartementService = require("../Services/Departement");
const session = require("express-session");

const jwt = require("jsonwebtoken");
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
router.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;
const APP_DOMAIN = process.env.APP_DOMAIN;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: APP_DOMAIN+"/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const user = {
        // id: profile.id,
        // name: profile.displayName,
        email: profile.emails[0].value,
      };

      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.use(passport.initialize());

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    let token;
    const prof = await ProfesseurService.getByEmail(req.user.email);
    if (prof) {
      const departement = await DepartementService.IsChef(prof._id);
      if (departement) {
        token = jwt.sign(
          { role: "chef", user: prof._id, departement: departement._id },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        res.redirect(CLIENT_URL+"/redirect?token=" + token+"&departement="+departement._id);

      } else {
        token = jwt.sign(
          { role: "prof", user: prof._id },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        res.redirect(CLIENT_URL+"/redirect?token=" + token);
      }
    } else {
      res.redirect(CLIENT_URL+"/login");
    }
  }
);

module.exports = router;
