import React, { useState, useRef, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';

const LoginPage = () => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'se'); // 'se' for Swedish, 'en' for English
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      },
      login: {
        title: 'Logga in',
        usernameLabel: 'Skriv in ditt användarnamn',
        usernamePlaceholder: 'Användarnamn',
        passLabel: 'Skriv in ditt lösenord',
        passPlaceholder: 'Lösenord',
        btn: 'Logga in',
        register: 'Registrera dig',
        forgot: 'Glömt lösenord?'
      },
      footer: {
        brand: '123 Fakturera',
        copyright: '© Lättfaktura, CRO no. 638537, 2025. All rights reserved.',
        links: {
          home: 'Hem',
          order: 'Beställ',
          contact: 'Kontakta oss'
        }
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
      },
      login: {
        title: 'Log in',
        usernameLabel: 'Enter your username',
        usernamePlaceholder: 'Username',
        passLabel: 'Enter your password',
        passPlaceholder: 'Password',
        btn: 'Log in',
        register: 'Register',
        forgot: 'Forgotten password?'
      },
      footer: {
        brand: '123 Fakturera',
        copyright: '© Lättfaktura, CRO no. 638537, 2025. All rights reserved.',
        links: {
          home: 'Home',
          order: 'Order',
          contact: 'Contact us'
        }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axiosInstance.post('/auth/login', { username, password });
      localStorage.setItem('jwt_token', res.data.token);
      navigate('/pricelist');
    } catch {
      setError('Login failed. Check username or password.');
    }
  };

  return (
    <div className="page-container">
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

      {/* Main Content */}
      <main className="main-content">
        <div className="login-card">
          <form onSubmit={handleSubmit}>
            <h1 className="login-title">{t.login.title}</h1>

            <div className="input-group">
              <label>{t.login.usernameLabel}</label>
              <input type="text" placeholder={t.login.usernamePlaceholder} value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="input-group">
              <label>{t.login.passLabel}</label>
              <div className="password-wrapper">
                <input type={showPassword ? 'text' : 'password'} placeholder={t.login.passPlaceholder} value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁'}</span>
              </div>
            </div>

            <button type="submit" className="login-btn">{t.login.btn}</button>

            {error && <p className="error-message">{error}</p>}

            <div className="card-footer-links">
              <a href="#register">{t.login.register}</a>
              <a href="#forgot">{t.login.forgot}</a>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="page-footer">
        <div className="footer-top-row">
            <div className="footer-brand">{t.footer.brand}</div>
            <div className="footer-links-right">
                <a href="#home">{t.footer.links.home}</a>
                <a href="#order">{t.footer.links.order}</a>
                <a href="#contact">{t.footer.links.contact}</a>
            </div>
        </div>
        
        <div className="footer-divider-line"></div>
        
        <div className="footer-bottom-row">
            <span className="copyright">{t.footer.copyright}</span>
        </div>
      </footer>
    </div>
  );
};
export default LoginPage;