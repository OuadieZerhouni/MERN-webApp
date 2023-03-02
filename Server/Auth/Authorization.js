const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
    const token = req.headers["authentication"].split(" ")[1];

    if (!token) return res.status(401).send("Access Denied");
    try {
        const role = jwt.verify(token, process.env.SECRET_KEY).role;
        if(role === "admin") res.send({role: "admin"});
        else if(role === "chef") res.send({role: "chef",departement: jwt.verify(token, process.env.TOKEN_SECRET).departement});
        else if(role === "prof") res.send({role: "prof"});
        else res.status(400).send("Invalid Token");
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
});

module.exports = router;
