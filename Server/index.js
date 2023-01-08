const express=require('express');
const app=express();
const Database=require('./API/Database');
//cors
const cors=require('cors');

app.use(cors());
//cors add http://localhost:3000 to the list of allowed origins
app.use(cors({origin:'http://localhost:3000'}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/database',Database);


app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});
