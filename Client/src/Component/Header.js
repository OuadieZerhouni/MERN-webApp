import React from 'react';
import { Link } from 'react-router-dom';
import "../CSS/ComponentCSS/Header.css";
import logo from '../assets/Logo.jpg';

class Header extends React.Component {
  


  Logout = () => {
    localStorage.removeItem('token');
    if(localStorage.getItem('departement')!==null)
        localStorage.removeItem('departement');
    window.location.reload();
  }
render() {
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
          <Link to="/Dashboard">Dashboard</Link>
        </li>
      )}
      <li className="header-list">
        <Link to="/">Accueil</Link>
      </li>
      <li className="header-list">
        <Link to="/departments">Departements</Link>
      </li>

      {localStorage.getItem("token") && (
        <li className="header-list">
          <button onClick={this.Logout}>Log-out</button>
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
}

export default Header;
