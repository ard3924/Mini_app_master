import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';
import './Login.css';

function LoginPage() {
  const [lang, setLang] = useState('se');
  const [texts, setTexts] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const res = await axiosInstance.get(`/translations/login/${lang}`);
        setTexts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTranslations();
  }, [lang]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axiosInstance.post('/auth/login', {
        username,
        password,
      });

      localStorage.setItem('jwt_token', res.data.token);
      navigate('/pricelist');
    } catch {
      setError('Login failed');
    }
  };

  return (
    <div
      className="login-wrapper"
      style={{
        backgroundImage:
          "url('https://storage.123fakturere.no/public/wallpapers/sverige43.jpg')",
      }}
    >
      {/* NAVBAR */}
      <header className="login-navbar">
        <img
          src="https://storage.123fakturere.no/public/icons/diamond.png"
          alt="logo"
          className="logo"
        />

        <nav className="nav-links">
          <Link to="/terms">{texts.terms_title || 'Terms'}</Link>
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              alert(texts.login_alert);
            }}
          >
            {texts.pricelist || 'Pricelist'}
          </a>
        </nav>

        <div className="lang-switch">
          <img
            src="https://storage.123fakturere.no/public/flags/SE.png"
            alt="SE"
            onClick={() => setLang('se')}
          />
          <img
            src="https://storage.123fakturere.no/public/flags/GB.png"
            alt="EN"
            onClick={() => setLang('en')}
          />
        </div>
      </header>

      {/* CENTERED CONTENT */}
      <div className="login-content">
        <div className="login-box">
          <h2>{texts.login_title}</h2>

          <form onSubmit={handleSubmit}>
            <label>{texts.username}</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>{texts.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <div className="login-error">{error}</div>}

            <button type="submit">{texts.login_button}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
