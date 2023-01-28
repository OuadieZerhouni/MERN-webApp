import React from 'react';
import { Link } from 'react-router-dom';
import "./ComponentCSS/Header.css"
import logo from '../Logo.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContactList: false
    };
  }

  toggleContactList = () => {
    this.setState({ showContactList: !this.state.showContactList });
  }

  render() {
    return (
      <header>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <ul className='ul-header'>
          <li  className='header-list'>
            <Link to="/">Home</Link>
          </li>
          <li className='header-list'>
            <Link to="/departments">Departments</Link>
          </li>
          <li className='header-list'>
            <Link to="/filiere">Filiere</Link>
          </li>
          <li className='ul-hover' onClick={this.toggleContactList}>
            Contact
            {this.state.showContactList && (
              <ul>
                <li>Email: contact@example.com</li>
                <li>Phone: 555-555-5555</li>
                <li>Address: 123 Main St</li>
              </ul>
            )}
          </li>
          <li className='header-list'>
            <Link to="/about">About Us</Link>
          </li>
          
          <li className='header-list'>
            <Link to="/login">Log-in</Link>
          </li>

        </ul>
      </header>
    );
  }
}

export default Header;
