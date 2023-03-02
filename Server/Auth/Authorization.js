const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
const profService = require("../Services/Professeur");

router.post("/", async (req, res) => {
    const token = req.headers["authentication"].split(" ")[1];

    if (!token) return res.status(401).send("Access Denied");
    try {
        const tokenData = jwt.verify(token, process.env.SECRET_KEY);
        const role = tokenData.role;

        if(role === "admin") res.send({role: "admin"});
        else if(role === "chef"){
            const prof = await profService.getById(tokenData.user);
         res.send({role: "chef",departement: tokenData.departement, prof: prof});
        }
        else if(role === "prof"){
        const prof = await profService.getById(tokenData.user);
         res.send({role: "prof",prof: prof});
        }
        else res.status(400).send("Invalid Token");
    } catch (err) {
        console.log(err);
        res.status(400).send("Invalid Token");
    }
});

module.exports = router;
