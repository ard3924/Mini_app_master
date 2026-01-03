import React, { useState } from 'react';
import './navbar.css';

const Navbar = ({ navContent, rightContent }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
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
      {menuOpen && (
        <div className="hamburger-menu" onClick={() => setMenuOpen(false)}>
          {navContent}
        </div>
      )}
    </>
  );
};

export default Navbar;
