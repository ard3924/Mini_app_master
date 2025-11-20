import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';
import './Terms.css';

function TermsPage() {
  const [lang, setLang] = useState('se');
  const [texts, setTexts] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await axiosInstance.get(`/translations/terms/${lang}`);
        setTexts(response.data);
      } catch (error) {
        console.error('Failed to fetch translations:', error);
      }
    };
    fetchTranslations();
  }, [lang]);

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="terms-page-wrapper" style={{ backgroundImage: `url('https://storage.123fakturere.no/public/wallpapers/sverige43.jpg')` }}>
      <header className="terms-header">
        <div className="logo">
          <img src="https://storage.123fakturere.no/public/icons/diamond.png" alt="Logo" />
        </div>
        <nav className="nav-links">
          <Link to="/terms">{texts.terms_title || 'Terms'}</Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); alert(texts.login_alert || 'Please login to access the pricelist.'); }}>{texts.pricelist || 'Pricelist'}</Link>
        </nav>
        <div className="header-right">
          <div className="lang-flags">
            <img src="https://storage.123fakturere.no/public/flags/SE.png" alt="Swedish" onClick={() => setLang('se')} style={{ cursor: 'pointer' }} />
            <img src="https://storage.123fakturere.no/public/flags/GB.png" alt="English" onClick={() => setLang('en')} style={{ cursor: 'pointer' }} />
          </div>
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="hamburger-menu">
          <Link to="/terms">{texts.terms_title || 'Terms'}</Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); alert(texts.login_alert || 'Please login to access the pricelist.'); }}>{texts.pricelist || 'Pricelist'}</Link>
        </div>
      )}
      <div className="terms-container">
        <div className="terms-page">
          <h1>{texts.terms_title}</h1>
          <div className="terms-content">
            <p style={{ whiteSpace: 'pre-line' }}>{texts.terms_content}</p>
          </div>
          <div className="button-container">
            <button onClick={handleClose} className="close-button">
              {texts.terms_close_button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
