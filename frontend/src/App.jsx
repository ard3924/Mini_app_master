import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TermsPage from './pages/TermsPage';
import PricelistPage from './pages/PricelistPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/pricelist" element={<PricelistPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
