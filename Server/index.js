const express=require('express');
const app=express();
const Database=require('./API/Database');
const cors=require('cors');
const login=require('./Routes/login');

app.use(cors());
app.use(cors({origin:'http://localhost:3000'}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/database',Database);
app.use('/login',login);


app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});
