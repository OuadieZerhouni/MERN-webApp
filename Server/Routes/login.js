const express=require('express');
const jwt=require('jsonwebtoken');
const professeur=require('../Models/Professeur');

const app=express();


app.use(express.json());
//recive the request from '/' and take email and password and verify them
app.post('/',async (req,res)=>{
    const {email,password}=req.body;
    const prof=await professeur.getByEmail(email);
    if(prof){
        if(prof.password===password){
            const token=jwt.sign({id:prof._id},process.env.SECRET_KEY);
            //send token a "prof" to the client
            res.send({token,"role":prof.role});
        }
        else{
            res.send({"error":"wrong password"});
        }
    }
    else{
        res.send({"error":"wrong email"});
    }
})


module.exports=app;

