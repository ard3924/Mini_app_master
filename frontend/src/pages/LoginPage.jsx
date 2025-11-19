
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';
import './Login.css';

function LoginPage() {
  const [lang, setLang] = useState('se');
  const [texts, setTexts] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await axiosInstance.get(`/translations/login/${lang}`);
        setTexts(response.data);
      } catch (error) {
        console.error('Failed to fetch translations:', error);
      }
    };
    fetchTranslations();
  }, [lang]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post('/auth/login', { username, password });

      const { token } = response.data;
      localStorage.setItem('jwt_token', token);
      navigate('/pricelist');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Check username or password.');
    }
  };

  return (
    <div className="login-page-wrapper" style={{ backgroundImage: `url('https://storage.123fakturere.no/public/wallpapers/sverige43.jpg')` }}>
      <header className="login-header">
        <div className="logo">
          <img src="https://storage.123fakturere.no/public/icons/diamond.png" alt="Logo" />
        </div>
        <nav className="nav-links">
          <Link to="/terms">{texts.terms_title || 'Terms'}</Link>
          <Link to="#">{texts.register || 'Register'}</Link>
        </nav>
        <div className="lang-flags">
          <img src="https://storage.123fakturere.no/public/flags/SE.png" alt="Swedish" onClick={() => setLang('se')} style={{ cursor: 'pointer' }} />
          <img src="https://storage.123fakturere.no/public/flags/GB.png" alt="English" onClick={() => setLang('en')} style={{ cursor: 'pointer' }} />
        </div>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      {isMenuOpen && (
        <div className="hamburger-menu">
          <Link to="/terms">{texts.terms_title || 'Terms'}</Link>
          <Link to="#">{texts.register || 'Register'}</Link>
        </div>
      )}
      <div className="login-container">
        <h2>{texts.login_title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{texts.username}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>{texts.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">{texts.login_button}</button>
        </form>
        <p className="forgot-password"><Link to="#">{texts.forgot_password}</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
