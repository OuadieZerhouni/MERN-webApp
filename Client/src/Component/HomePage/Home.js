import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Post from "./SubComponents/Post";
import "../../CSS/ComponentCSS/Home.css";
import Departement from "./SubComponents/Departements";

export default function Home() {
  const logoRef = useRef(null);
  const bgcontent = useRef(null);
  const hidden = useRef(null);

  function handleScroll() {
    const scrollPosition = bgcontent.current.scrollTop;
    const opacity = 1 - Math.min(scrollPosition / 1400, 1);
    logoRef.current.style.opacity = opacity;
    hidden.current.style.opacity = 1 - opacity;
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
           {/* here place the footer */}
        </div>
      </div>
    </div>
  );
}
