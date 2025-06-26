import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components_css/AddItem.css';

const AddItem = ({ onBack }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  const fetchInventory = () => {
    fetch('/api/inventory')
      .then((res) => res.json())
      .then((data) => setResult(data))
      .catch(() => setResult([]));
  };

  const handleBackButton = () => {
    navigate('/'); // Navigate back to the IndexPage
  };

  // Handle the addition of a new item to the inventory (stack principle)
  const handleAddItem = () => {
    if (!id || !name || !quantity || !price || !unit) {
      alert('Please fill all fields!');
      return;
    }

    fetch('/api/inventory/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: parseInt(id),
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        unit,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add item');
        return res.json();
      })
      .then(() => {
        fetchInventory();
        setId('');
        setName('');
        setQuantity('');
        setPrice('');
        setUnit('');
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="add-item-container">
      <h2>Add Item</h2>
      <form>
        <div className="form-group">
          <label htmlFor="id">Item ID</label>
          <input
            type="number"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <input
            type="text"
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
      </form>

      <div className="result">
        <h3>Items in Inventory (Stack Order):</h3>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back Button to return to App.js */}
      <button onClick={handleBackButton}>Back</button>
    </div>
  );
};

export default AddItem;
