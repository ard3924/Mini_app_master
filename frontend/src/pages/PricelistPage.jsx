import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';
import './Pricelist.css';

function PricelistPage() {
  const [pricelist, setPricelist] = useState([]);
  const [editing, setEditing] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchPricelist();
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
      setEditing(prev => {
        const newEditing = { ...prev };
        delete newEditing[id];
        return newEditing;
      });
      fetchPricelist();
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  return (
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
              <td>
                <input
                  type="text"
                  value={editing[item.id]?.product_service ?? item.product_service}
                  onChange={(e) => handleEdit(item.id, 'product_service', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={editing[item.id]?.in_price ?? item.in_price}
                  onChange={(e) => handleEdit(item.id, 'in_price', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={editing[item.id]?.price ?? item.price}
                  onChange={(e) => handleEdit(item.id, 'price', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={editing[item.id]?.quantity ?? item.quantity}
                  onChange={(e) => handleEdit(item.id, 'quantity', e.target.value)}
                />
              </td>
              <td>{((editing[item.id]?.price ?? item.price) * (editing[item.id]?.quantity ?? item.quantity)).toFixed(2)}</td>
              <td>
                <button onClick={() => handleSave(item.id)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PricelistPage;
