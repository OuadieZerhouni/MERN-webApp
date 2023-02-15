const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const professeur=require('../Services/Professeur');
const admin=require('../Services/Admin');

const app=express();


app.use(express.json());
//recive the request from '/' and take email and password and verify them
app.post('/',async (req,res)=>{
    const {email,password}=req.body;
    const user=await professeur.getByEmail(email);
    const admin=await admin.getByEmail(email);
    if(admin){
        if(await bcrypt.compare(password,admin.password)){
            const token=jwt.sign({id:admin._id},process.env.TOKEN_SECRET);
            res.header('token',token).send(token);
            res.send('log-in');
        }else{
            res.send('password is wrong');
        }
    }else if(user){
        if(await bcrypt.compare(password,user.password)){
            const token=jwt.sign({id:user._id},process.env.TOKEN_SECRET);
            res.header('token',token).send(token);
            res.send('log-in');
        }else{
            res.send('password is wrong');
        }

    }else{
        res.send('Email  is wrong');

    }
});


module.exports=app;

