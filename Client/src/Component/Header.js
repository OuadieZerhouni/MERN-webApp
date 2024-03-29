import React , {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../CSS/ComponentCSS/Header.css";
import logo from '../assets/Logo.jpg';

function Header () {
   
const location = useLocation();

useEffect(() => {
  const header = document.querySelector("header");
  if (location.pathname !== "/") {
    header.style.background = "rgb(47 ,77, 133)";
}
else {
  header.style.background = "linear-gradient(0deg,transparent,rgba(34, 43, 70, 0.99)),linear-gradient(0deg,transparent 20%,rgba(30, 46, 133, 0.788))";
}
}
, [location]);

  const Logout = () => {
    localStorage.removeItem('token');
    if(localStorage.getItem('departement')!==null)
        localStorage.removeItem('departement');
    window.location.reload();
  }

  return (<header>
    <Link to="/" className="logo-container">
      USMBA
    </Link>
    <div class="menu-icon">
      {/* <img src="/menu-icon.svg" alt="Menu" /> */}
    </div>
    <ul className="ul-header">
      {localStorage.getItem("token") && (
        <li className="header-list">
          <Link to="/Dashboard">Tableau de bord</Link>
        </li>
      )}
      <li className="header-list">
        <Link to="/">Accueil</Link>
      </li>
      <li className="header-list">
        <Link to="/departements">Départements</Link>
      </li>

      {localStorage.getItem("token") && (
        <li className="header-list">
          <button onClick={Logout}>Log-out</button>
        </li>
      )}
      {!localStorage.getItem("token") && (
        <li className="header-list">
          <Link to="/login">Log-in</Link>
        </li>
      )}
    </ul>
  </header>
  );

}

export default Header;
