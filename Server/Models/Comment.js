const mongoose = require("mongoose");

require("dotenv").config();

const CommentShema = new mongoose.Schema({
    
        value:{
                type:String,
                required:true,

        }
        ,
        date_comment:{ 
            type:Date,
            required:true,
        }
        ,
        professeur: {type:String ,
            required:true,
        }
      
  });
  
  const Comment = mongoose.model("Comment", CommentShema);
  
  
  
  module.exports = Comment;
  