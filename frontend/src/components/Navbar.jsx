import React from 'react';
import './navbar.css';

const Navbar = ({ navContent, rightContent }) => {
  return (
    <header className="navbar">
      <img
        src="https://storage.123fakturere.no/public/icons/diamond.png"
        alt="Logo"
        className="navbar-logo"
      />
      <nav className="navbar-nav">
        {navContent}
      </nav>
      <div className="navbar-right">
        {rightContent}
      </div>
    </header>
  );
};

export default Navbar;
