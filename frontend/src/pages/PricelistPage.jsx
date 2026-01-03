import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosinterceptor';
import './Pricelist.css';
import { useNavigate } from 'react-router-dom';

export default function PricelistPage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const fetchItems = async () => {
    const res = await axiosInstance.get('/pricelist');
    setItems(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchItems();
  }, []);

  const onChange = (id, field, value) => {
    setEditing(p => ({ ...p, [id]: { ...p[id], [field]: value } }));
  };

  const onBlur = async (id) => {
    if (!editing[id]) return;
    await axiosInstance.put(`/pricelist/${id}`, editing[id]);
    fetchItems();
  };

  return (
    <div className="app-shell">

      {/* TOP NAVBAR */}
      <header className="topbar">
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="user-info">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="user"
            width="42"
            height="42"
            className="avatar"
          />
          <div>
            <div className="username">John Andre</div>
            <div className="company">Storfjord AS</div>
          </div>
        </div>

        <div className="lang">
          English
          <img
             src="https://storage.123fakturere.no/public/flags/GB.png"
          alt="lang"
          />
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <div className="user-info-mobile" onClick={(e) => e.stopPropagation()}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="user"
              width="42"
              height="42"
              className="avatar"
            />
            <div>
              <div className="username">John Andre</div>
              <div className="company">Storfjord AS</div>
            </div>
          </div>

          <div className="menu-items-mobile" onClick={(e) => e.stopPropagation()}>
            {[
              'Price List',
            ].map(item => (
              <div
                key={item}
                className={`menu-item ${item === 'Price List' ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </div>
            ))}

            <div
              className="menu-item logout"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                localStorage.removeItem('jwt_token');
                navigate('/login');
              }}
            >
              Log out
            </div>
          </div>
        </div>
      )}

      <div className="body">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <h4>Menu</h4>

          {[
            'Price List',
          ].map(item => (
            <div
              key={item}
              className={`menu-item ${item === 'Price List' ? 'active' : ''}`}
            >
              {item}
            </div>
          ))}

          <div
            className="menu-item logout"
            onClick={() => {
              localStorage.removeItem('jwt_token');
              navigate('/login');
            }}
          >
            Log out
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="content">

          {/* SEARCH + ACTIONS */}
          <div className="toolbar">
            <div className="search-group">
              <input placeholder="Search Article No..." />
              <input placeholder="Search Product..." />
            </div>

            <div className="actions">
              <button className="pill green">New Product</button>
              <button className="pill">Print List</button>
              <button className="pill toggle">Advanced mode</button>
            </div>
          </div>

          {/* TABLE */}
          <div className="table">
            <div className="thead">
              <span>Article No</span>
              <span>Product/Service</span>
              <span>In Price</span>
              <span>Price</span>
              <span>Unit</span>
              <span>In Stock</span>
              <span>Description</span>
              <span></span>
            </div>

            {items.map(item => (
              <div className="row spaced" key={item.id}>
                <input value={item.id} disabled />
                <input
                  value={editing[item.id]?.product_service ?? item.product_service}
                  onChange={e => onChange(item.id, 'product_service', e.target.value)}
                  onBlur={() => onBlur(item.id)}
                />
                <input value={item.in_price} readOnly />
                <input
                  value={editing[item.id]?.price ?? item.price}
                  onChange={e => onChange(item.id, 'price', e.target.value)}
                  onBlur={() => onBlur(item.id)}
                />
                <input value="kilometers/hour" readOnly />
                <input value="2500600" readOnly />
                <input value="This is the description with fifty characters this" readOnly />
                <span className="dots">⋮</span>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
