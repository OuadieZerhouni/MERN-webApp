import React from 'react';
import "../../CSS/ComponentCSS/Footer.css"


export default function Footer() {
  return (
    <footer>
      <div id="footer-div-1">
        <div id="social-media">
          <i class="fa-brands fa-square-facebook"></i>
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-linkedin-in"></i>
          <i class="fa-brands fa-twitter"></i>
        </div>
        <div id="links">
          <ul>
            <li class="footer-ul-title">E-LEARN</li>
            <li><a href="">Moodle</a></li>
            <li><a href="">Learn remote</a></li>
            <li><a href="">USMBA E-LEARN</a></li>
            <li><a href="">Remote Learning</a></li>
          </ul>
          <ul>
          <li class="footer-ul-title">Departements</li>
            <li><a href="">G.Informatique</a></li>
            <li><a href="">Technique de managment</a></li>
            <li><a href="">G.Mecanique</a></li>
            <li><a href="">G.Procedes</a></li>
          </ul>
          <ul>
          <li class="footer-ul-title">ADMISSION</li>
            <li><a href="">Admisson 1</a></li>
            <li><a href="">Admisson 2</a></li>
            <li><a href="">Admisson 3</a></li>
            <li><a href="">Admisson 4</a></li>
            
            
          </ul>
          <ul>
          <li class="footer-ul-title">HEALTH CARE</li>
            <li><a href="">Health care</a></li>
            <li><a href="">Inssurance</a></li>
            <li><a href="">Health Program</a></li>
            <li><a href="">Covid-19</a></li>
          </ul>
        </div>
      </div>
      <div id="footer-div-2">
        <h1>USMBA</h1>
        <div>
        <ul>
          <li><a href="">Home</a></li>
          <li><a href="">Privacy</a></li>
          <li><a href="">About Us</a></li>
          <li><a href="">Terms Of Use</a></li>
          <li><a href="">CopyRight @</a></li>
        </ul>
          <h4>©Copyright USMBA 2023. <a href="https://github.com/Abdessamad-Belmadani">Abdessamad Belmadani</a> <a href="https://github.com/OuadieZerhouni">Ouadie Zerhouni</a></h4>
        </div>
        
      </div>
    </footer>
  );
}
