import React from "react";
import "../../CSS/ComponentCSS/Footer.css";

export default function Footer() {
  return (
    <footer>
      <div id="footer-div-1">
        <div id="social-media">
          <a target={"_blank"} href="https://www.facebook.com/usmba.ac.ma/" id="facebook">
            <i class="fa-brands fa-square-facebook fa-2xl"></i>
          </a>
          <a target={"_blank"} href="https://www.instagram.com/usmba_fes/" id="instagram">
            <i class="fa-brands fa-instagram fa-2xl"></i>
          </a>
          <a target={"_blank"} href="https://www.linkedin.com/company/usmba/" id="linkedin">
            <i class="fa-brands fa-linkedin-in fa-2xl"></i>
          </a>
          <a target={"_blank"} href="https://twitter.com/usmbacom" id="twitter">
            <i class="fa-brands fa-twitter fa-2xl"></i>
          </a>
          <a
            target={"_blank"}
            href="https://www.google.fr/maps/place/33%C2%B059'22.6%22N+5%C2%B000'06.9%22W/@33.989603,-5.001903,14z/data=!4m4!3m3!8m2!3d33.989603!4d-5.001903?hl=fr"
            id="location"
          >
            <i class="fa-solid fa-location-dot fa-2xl"></i>
          </a>
        </div>

        <div id="footer-links">
          <a class="logo-container" href="/">
            USMBA
          </a>
          <div id="links">
            <ul>
              <li class="footer-ul-title">Est services</li>
              <li>
                <a target={"_blank"} href="http://elearn.est-usmba.ac.ma/est/">
                  Moodle
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href="http://services.est-usmba.ac.ma/etudiant/login/"
                >
                  E-Notes
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href="http://www.est-usmba.ac.ma/CONCOURSESTfes.php"
                >
                  Concours
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href=" http://www.est-usmba.ac.ma/duESTFES.php"
                >
                  Suivi des lauréats
                </a>
              </li>
            </ul>

            <ul>
              <li class="footer-ul-title">Autre liens</li>
              <li>
                <a
                  target={"_blank"}
                  href="http://www.est-usmba.ac.ma/Cours.php"
                >
                  Cours
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href="http://www.est-usmba.ac.ma/contact.php"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href=" http://www.est-usmba.ac.ma/rech_activ.php"
                >
                  Activités de l'EstF
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div id="footer-credits">
          <ul>
            <li>
              <a target={"_blank"} href="https://www.termsfeed.com/live/ecfe9b74-24da-4c30-8c5d-479a9edf753d">
                Terms Of Use
              </a>
            </li>
            <li>
              <a target={"_blank"} href="">
                ©Copyright USMBA 2023
              </a>
            </li>
          </ul>

          <h4>
          <span>Develepée par</span>
          <a target={"_blank"} href="https://github.com/OuadieZerhouni">
              Ouadie Zerhouni
            </a>
            <span id="dot"> •</span>
            
            <a target={"_blank"} href="https://github.com/Abdessamad-Belmadani">
            Abdessamad Belmadani
            </a>
          </h4>
        </div>
      </div>
    </footer>
  );
}
