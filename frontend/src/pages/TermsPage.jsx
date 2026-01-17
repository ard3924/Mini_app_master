import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinterceptor";
import "./Terms.css";

export default function TermsPage() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'se');
  const [texts, setTexts] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const dropdownRefRight = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target)) &&
        (dropdownRefRight.current && !dropdownRefRight.current.contains(event.target))
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Content Dictionary
  const content = {
    se: {
      nav: {
        home: 'Hem',
        order: 'Beställ',
        customers: 'Våra Kunder',
        about: 'Om oss',
        contact: 'Kontakta oss',
        terms: 'Villkor',
        currentLang: 'Svenska'
      }
    },
    en: {
      nav: {
        home: 'Home',
        order: 'Order',
        customers: 'Our Customers',
        about: 'About us',
        contact: 'Contact Us',
        terms: 'Terms',
        currentLang: 'English'
      }
    }
  };

  const t = content[lang];

  // Image Assets
  const assets = {
    bg: 'https://storage.123fakturera.se/public/wallpapers/sverige43.jpg',
    logo: 'https://storage.123fakturera.se/public/icons/diamond.png',
    flagSE: 'https://storage.123fakturere.no/public/flags/SE.png',
    flagGB: 'https://storage.123fakturere.no/public/flags/GB.png'
  };

  const currentFlag = lang === 'se' ? assets.flagSE : assets.flagGB;

  const handleLangSwitch = (selectedLang) => {
    setLang(selectedLang);
    try { localStorage.setItem('lang', selectedLang); } catch (e) { }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const res = await axiosInstance.get(
          `/translations/terms/${lang}`
        );
        setTexts(res.data);
      } catch (err) {
        console.error("Failed to load terms", err);
      }
    };
    fetchTexts();
  }, [lang]);

  return (
    <div
      className="terms-wrapper"
      style={{
        backgroundImage:
          "url(https://storage.123fakturera.se/public/wallpapers/sverige43.jpg)",
      }}
    >
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={assets.logo} alt="Diamond Logo" className="nav-logo" />
          <button className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="nav-center">
          <Link to="/">{t.nav.home}</Link>
          <Link to="#order">{t.nav.order}</Link>
          <Link to="#customers">{t.nav.customers}</Link>
          <Link to="#about">{t.nav.about}</Link>
          <Link to="#contact">{t.nav.contact}</Link>
          <Link to="/terms">{t.nav.terms}</Link>
          <div ref={dropdownRef}>
            <div
              className="lang-selector"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="lang-label">{t.nav.currentLang}</span>
              <img src={currentFlag} alt="flag" className="flag-icon" />
            </div>

            {isDropdownOpen && (
              <div className="lang-dropdown">
                <div className="dropdown-item" onClick={() => handleLangSwitch('se')}>
                  <span>Svenska</span>
                  <img src={assets.flagSE} alt="SE" className="flag-icon" />
                </div>
                <div className="dropdown-item" onClick={() => handleLangSwitch('en')}>
                  <span>English</span>
                  <img src={assets.flagGB} alt="GB" className="flag-icon" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="nav-right">
          <div ref={dropdownRefRight}>
            <div
              className="lang-selector"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="lang-label">{t.nav.currentLang}</span>
              <img src={currentFlag} alt="flag" className="flag-icon" />
            </div>

            {isDropdownOpen && (
              <div className="lang-dropdown">
                <div className="dropdown-item" onClick={() => handleLangSwitch('se')}>
                  <span>Svenska</span>
                  <img src={assets.flagSE} alt="SE" className="flag-icon" />
                </div>
                <div className="dropdown-item" onClick={() => handleLangSwitch('en')}>
                  <span>English</span>
                  <img src={assets.flagGB} alt="GB" className="flag-icon" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.home}</Link>
              <Link to="#order" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.order}</Link>
              <Link to="#customers" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.customers}</Link>
              <Link to="#about" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.about}</Link>
              <Link to="#contact" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.contact}</Link>
              <Link to="/terms" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.terms}</Link>
            </div>
          </div>
        )}
      </nav>

      {/* TITLE */}
      <h1 className="terms-title">{texts.terms_title}</h1>

      {/* GREEN BAR */}
      <button
        className="terms-close-btn"
        onClick={() => navigate("/")}
      >
        {texts.terms_close_button}
      </button>

      {/* CONTENT CARD */}
      <div className="terms-card">
        <div className="terms-text">
          {texts.terms_content}
        </div>
      </div>
       <button
        className="terms-close-btn"
        onClick={() => navigate("/")}
      >
        {texts.terms_close_button}
      </button>
    </div>
  );
}
