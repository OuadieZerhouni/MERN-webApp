import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Post from "./SubComponents/Post";
import "../../CSS/ComponentCSS/Home.css";
import Departement from "./SubComponents/Departements";
import Footer from "./Footer.js"

export default function Home() {
  const logoRef = useRef(null);
  const bgcontent = useRef(null);
  const hidden = useRef(null);


  useEffect(() => {
    const header = document.querySelector("header");
      header.style.background = "linear-gradient(0deg,transparent,rgba(34, 43, 70, 0.99)),linear-gradient(0deg,transparent 20%,rgba(30, 46, 133, 0.788))";
  }
  , []);
  function handleScroll() {
    const scrollPosition = bgcontent.current.scrollTop;
    const opacity = 1 - Math.min(scrollPosition / 1400, 1);
    logoRef.current.style.opacity = opacity;
    hidden.current.style.opacity = 1 - opacity;
    const header = document.querySelector("header");
    if (scrollPosition > 0 ) {
      header.style.background = "rgb(47 77 133)";
    }
    if (scrollPosition === 0) {
      header.style.background = "linear-gradient(0deg,transparent,rgba(34, 43, 70, 0.99)),linear-gradient(0deg,transparent 20%,rgba(30, 46, 133, 0.788))";
    }
   
  }

  return (
    <div className="bg-cont" onScroll={handleScroll} ref={bgcontent}>
      <div className="logo-center" ref={logoRef}>
        USMBA
      </div>
      <div className="Home-cont" id='home'>
        <div className="first-div" ref={hidden}></div>
        <div className="second-div">
          <Departement />
          <Post />
           <Footer/>
        </div>
      </div>
    </div>
  );
}
