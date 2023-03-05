import React, { useEffect } from "react";
import Post from "../HomePage/Post";
import "../ComponentCSS/Home.css";
import Header from "../Header";


export default function Home() {
 

  return (
    <div className="bg-cont">
      <Header />
      <div className="logo-center">

      </div>
      <div className="Home-cont">
        <div className="first-div">
        

        </div>
        <div className="second-div">
          <Post />

        </div>
        </div>
        
    </div>
  );
}
