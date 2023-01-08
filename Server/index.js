// const express=require('express');
// const app=express();
// const Database=require('./API/Database');
// //cors
// const cors=require('cors');

// app.use(cors());
// //cors add http://localhost:3000 to the list of allowed origins
// app.use(cors({origin:'http://localhost:3000'}));

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use('/api/database',Database);


// app.listen(3001,()=>{
//     console.log("Server is running on port 3001");
// });

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


const DepartementSchema = new mongoose.Schema({
    Nom: String,
    description: String,
    Date_Creation: Date,
    id_Chef: String,
    professeurs: [ String ],
    Filieres: [ String ],
  });
  const Departement = mongoose.model('departement', DepartementSchema);
  
const newDepartement = new Departement({
  _id: new mongoose.Types.ObjectId(),
  Nom: 'Computer Science',
  description: 'A department focused on computer science research and education',
  Date_Creation: new Date(),
  id_Chef: '5f1f7e8e9cdaa91f6c53902d',
  professeurs: ['5f1f7e8e9cdaa91f6c53902e', '5f1f7e8e9cdaa91f6c53902f'],
  Filieres: ['5f1f7e8e9cdaa91f6c539030', '5f1f7e8e9cdaa91f6c539031']
}).save((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Successfully inserted new Departement!');
  }
  mongoose.connection.close();
});
