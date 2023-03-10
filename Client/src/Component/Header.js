import React from 'react';
import { Link } from 'react-router-dom';
import "../CSS/ComponentCSS/Header.css";
import logo from '../assets/logo-small.png';

class Header extends React.Component {
  


  Logout = () => {
    localStorage.removeItem('token');
    if(localStorage.getItem('departement')!==null)
        localStorage.removeItem('departement');
    window.location.reload();
  }

  render() {
    return (
      <header>
        
        <Link to="/" className='logo-container'>
          <img src={logo} alt="Logo" className='logo-up' />
        </Link>
        <ul className='ul-header'>
        {localStorage.getItem('token') && (
             <li className='header-list' >
             <Link to="/Dashboard">Dashboard</Link>
           </li>
          )}
          <li  className='header-list'>
            <Link to="/">Home</Link>
          </li>
          <li className='header-list'>
            <Link to="/departments">Departments</Link>
          </li>
          <li className='header-list'>
            <Link to="/filiere">Filiere</Link>
          </li>
          
          
          {localStorage.getItem('token') && (
            <li className='log-out' onClick={this.Logout}>
              Logout
            </li>
          )}
          {!localStorage.getItem('token') && (
            <li className='header-list' >
              <Link to="/login">Log-in</Link>
            </li>
          )}
        </ul>

      </header>
    );
  }
}

export default Header;
