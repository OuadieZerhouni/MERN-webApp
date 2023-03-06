import React from 'react';
import { Link } from 'react-router-dom';
import "./ComponentCSS/Header.css"
import logo from '../assets/logo-small.png';

class Header extends React.Component {
  


  Logout = () => {
    localStorage.removeItem('token');
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
          
          <li className='header-list'>
            <Link to="/about">About Us</Link>
          </li>
          {localStorage.getItem('token') && (
            <li className='header-list' onClick={this.Logout}>
              Log-out
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
