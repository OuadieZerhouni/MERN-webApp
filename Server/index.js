const express=require('express');
const app=express();
const Database=require('./API/Database');
const cors=require('cors');
const login=require('./Auth/login');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const path=require('path');
const bcrypt=require('bcrypt');


const UserAuth=require('./Auth/Authorization');


dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


app.use(cors());
app.use(cors({origin:'http://localhost:3030'}));

app.use('/uploads/Emplois', express.static(path.join(__dirname, 'uploads', 'Emplois')));
app.use('/uploads/PVs', express.static(path.join(__dirname, 'uploads', 'PVs',)));
app.use('/uploads/posts', express.static(path.join(__dirname, 'uploads', 'posts',)));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

try{
app.use('/api',Database);
app.use('/login',login);
app.use('/auth',UserAuth);


}catch(err){
    console.log(err);
}





app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});
