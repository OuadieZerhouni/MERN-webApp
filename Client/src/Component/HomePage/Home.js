import React, { useEffect } from "react";
import { useState , useRef} from "react";
import Post from "../HomePage/Post";
import "../ComponentCSS/Home.css";
import Header from "../Header";


export default function Home() {
  const logoRef = useRef(null);
  const [opacity, setOpacity] = useState(1);
 
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const opacity = 1 - Math.min(scrollPosition / 200, 1);
      console.log(opacity);
      setOpacity(opacity);
    }
  
  return (
    <div className="bg-cont" onScroll={handleScroll}>
      <Header />
      <div className="logo-center" ref={logoRef} >
        {/* content of the logo-center element */}
      </div>
      <div className="Home-cont" >
        <div className="first-div"></div>
        <div className="second-div"  >
          <Post />
        </div>
      </div>
    </div>
  );
}
