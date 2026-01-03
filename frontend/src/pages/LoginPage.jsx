import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';
import './Login.css';
import '../components/navbar.css';
import Navbar from '../components/Navbar';

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
      const res = await axiosInstance.post('/auth/login', { username, password });
      localStorage.setItem('jwt_token', res.data.token);
      navigate('/pricelist');
    } catch {
      setError('Login failed. Check username or password.');
    }
  };

  return (
    <div
      className="login-page-wrapper"
      style={{ backgroundImage: `url('https://storage.123fakturere.no/public/wallpapers/sverige43.jpg')` }}
    >
      <Navbar
        navContent={
          <>
            <Link to="/terms">{texts.terms_title || 'Terms'}</Link>
            <Link to="#" onClick={(e) => e.preventDefault()}>
              {texts.pricelist || 'Pricelist'}
            </Link>
          </>
        }
        rightContent={
          <div className="lang-flags">
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
        }
      />

      {/* Centered Login Card */}
      <div className="login-center">
        <div className="login-card">
          <h2>{texts.login_title || 'Logga in'}</h2>

          <form onSubmit={handleSubmit}>
            <label>{texts.username}</label>
            <input
              type="text"
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

            {error && <p className="error">{error}</p>}

            <button type="submit">
              {texts.login_button || 'Logga in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
