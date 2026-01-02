import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinterceptor";
import "./Terms.css";

export default function TermsPage() {
  const [lang, setLang] = useState("se");
  const [texts, setTexts] = useState({});
  const navigate = useNavigate();

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
      {/* NAVBAR */}
      <header className="terms-navbar">
        <img
          src="https://storage.123fakturera.se/public/icons/diamond.png"
          alt="logo"
          className="logo"
        />

        <nav className="terms-nav-links">
          <span className="active">{texts.terms_title}</span>
          <span
            className="link"
            onClick={() =>
              alert(texts.login_alert || "Please login")
            }
          >
            {texts.pricelist}
          </span>
        </nav>

        <div className="lang-switch">
          <img
            src="https://storage.123fakturere.no/public/flags/SE.png"
            alt="SE"
            onClick={() => setLang("se")}
          />
          <img
            src="https://storage.123fakturere.no/public/flags/GB.png"
            alt="EN"
            onClick={() => setLang("en")}
          />
        </div>
      </header>

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
    </div>
  );
}
