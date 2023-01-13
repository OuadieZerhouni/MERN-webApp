import React from 'react';
import { Link } from 'react-router-dom';
import "./Forms/FormsCSS/Header.css"
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
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li onClick={this.toggleContactList}>
            Contact
            {this.state.showContactList && (
              <ul>
                <li>Email: contact@example.com</li>
                <li>Phone: 555-555-5555</li>
                <li>Address: 123 Main St</li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/departments">Departments</Link>
          </li>
          <li>
            <Link to="/filiere">Filiere</Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
