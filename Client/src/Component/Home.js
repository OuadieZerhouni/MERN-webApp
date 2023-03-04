import React, { useEffect } from "react";
import "./ComponentCSS/Home.css";
import Header from "./Header";
import logo from "../assets/logo-transparent.png";


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
        This div will be hidden until the user scrolls down.

        </div>
        </div>
        
    </div>
  );
}
