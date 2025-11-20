import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';
import './Login.css';
import './Pricelist.css';

function PricelistPage() {
  const [pricelist, setPricelist] = useState([]);
  const [editing, setEditing] = useState({});
  const [lang, setLang] = useState('se');
  const [texts, setTexts] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchPricelist();

    const fetchTranslations = async () => {
      try {
        const response = await axiosInstance.get(`/translations/login/${lang}`);
        setTexts(response.data);
      } catch (error) {
        console.error('Failed to fetch translations:', error);
      }
    };
    fetchTranslations();

  }, [navigate]);

  const fetchPricelist = async () => {
    try {
      const response = await axiosInstance.get('/pricelist');
      setPricelist(response.data);
    } catch (error) {
      console.error('Failed to fetch pricelist:', error);
    }
  };

  const handleEdit = (id, field, value) => {
    setEditing(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleSave = async (id) => {
    const data = editing[id];
    try {
      await axiosInstance.put(`/pricelist/${id}`, data);
      alert('Product saved successfully!');
      setEditing(prev => {
        const newEditing = { ...prev };
        delete newEditing[id];
        return newEditing;
      });
      fetchPricelist();
    } catch (error) {
      console.error('Failed to update item:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  return (
    <div className="pricelist-page-wrapper" style={{ backgroundImage: `url('https://storage.123fakturere.no/public/wallpapers/sverige43.jpg')` }}>
      <header className="login-header">
        <div className="logo">
          <img src="https://storage.123fakturere.no/public/icons/diamond.png" alt="Logo" />
        </div>
        <div className="header-right">
          <nav className="nav-links">
            <a href="#" onClick={() => { localStorage.removeItem('jwt_token'); navigate('/login'); }}>Logout</a>
          </nav>
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="hamburger-menu">
          <a href="#" onClick={() => { localStorage.removeItem('jwt_token'); navigate('/login'); }}>Logout</a>
        </div>
      )}
      <div className="pricelist-container">
        <div className="pricelist-page">
          <h1>Pricelist</h1>
          <table>
            <thead>
              <tr>
                <th>Product/Service</th>
                <th>In Price</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pricelist.map(item => (
                <tr key={item.id}>
                  <td data-label="Product/Service">
                    <input
                      type="text"
                      value={editing[item.id]?.product_service ?? item.product_service}
                      onChange={(e) => handleEdit(item.id, 'product_service', e.target.value)}
                    />
                  </td>
                  <td data-label="In Price">
                    <input
                      type="number"
                      step="0.01"
                      value={editing[item.id]?.in_price ?? item.in_price}
                      onChange={(e) => handleEdit(item.id, 'in_price', e.target.value)}
                    />
                  </td>
                  <td data-label="Price">
                    <input
                      type="number"
                      step="0.01"
                      value={editing[item.id]?.price ?? item.price}
                      onChange={(e) => handleEdit(item.id, 'price', e.target.value)}
                    />
                  </td>
                  <td data-label="Quantity">
                    <input
                      type="number"
                      value={editing[item.id]?.quantity ?? item.quantity}
                      onChange={(e) => handleEdit(item.id, 'quantity', e.target.value)}
                    />
                  </td>
                  <td data-label="Total">{((editing[item.id]?.price ?? item.price) * (editing[item.id]?.quantity ?? item.quantity)).toFixed(2)}</td>
                  <td data-label="Actions">
                    <button onClick={() => handleSave(item.id)}>Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PricelistPage;
