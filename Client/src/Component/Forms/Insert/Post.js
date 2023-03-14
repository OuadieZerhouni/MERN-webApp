import React from "react";
import axios from "axios";

function PostForm(){
    const[PostTitle, setPostTitle] = React.useState("");
    const[PostText, setPostText] = React.useState("");
    const[PostImage, setPostImage] = React.useState("");

    const API_Database = process.env.REACT_APP_API_DATABASE;


    const handlePostInsert = () => {
      // if(PostTitle === "" || PostText === "" || !PostImage ){
      //   alert("Please Fill All Fields");
      //   return;
      // }
        const formData = new FormData();
        formData.append("title", PostTitle);
        formData.append("text", PostText);
        formData.append("image", PostImage);
        axios.post(API_Database+"/post/insert", formData,{
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }).then((response) => {
            alert("Post inserted successfully");
            window.location.reload();
        }).catch((error) => {
            alert("Error inserting Post");
        });
        }


    return(
        <div className="form">
        <h1 className="form-title">Insérer Post</h1>
        <label htmlFor="Post-nom" className="form-label">
          Post title:
        </label>
        <input
          className="form-input"
          type="text"
          id="Post-nom"
          value={PostTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <br />
        <label htmlFor="Post-Desc" className="form-label">
          Post text:
        </label>
        <textarea
          className="form-textarea"
          id="Post-Desc"
          value={PostText}
          onChange={(e) => setPostText(e.target.value)}
        />      
      
         
        <label htmlFor="Post-file" className="form-label">
          image:
          </label>
        <input
          className="form-input"
          type="file"
          id="Post-file"
          accept="image/png, image/jpeg"
          onChange={(e) => setPostImage(e.target.files[0])}
        />
  
        <button
          className="form-button"
          type="button"
          onClick={handlePostInsert}
        >
          Insert Post
        </button>
      </div>
    )
}

export default PostForm;