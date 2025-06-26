import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components_css/UpdateItem.css';

const UpdateItem = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Load items from localStorage
  const loadInventory = () => {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    return inventory;
  };

  const saveInventory = (inventory) => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  };

  // Handle updating an item by ID
  const handleUpdateItem = () => {
    if (!id || !name || !price || !unit) {
      alert('Please fill all fields!');
      return;
    }

    // Load current inventory from localStorage
    const inventory = loadInventory();

    // Find the item by its ID
    const itemIndex = inventory.findIndex((item) => item.id === parseInt(id));
    if (itemIndex === -1) {
      alert('Item not found!');
      return;
    }

    // Update item details
    inventory[itemIndex].name = name;
    inventory[itemIndex].price = parseFloat(price);
    inventory[itemIndex].unit = unit;

    // Save the updated inventory back to localStorage
    saveInventory(inventory);

    // Set the result to display the updated inventory
    setResult(`Updated Item ID: ${id}, Name: ${name}, Price: ${price}, Unit: ${unit}`);
  };

  // Navigate back to the home page
  const handleBackButton = () => {
    navigate('/'); // Navigate back to the IndexPage
  };

  return (
    <div className="update-item-container">
      <h2>Update Item</h2>
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
        <button type="button" onClick={handleUpdateItem}>Update Item</button>
      </form>

      {/* Result Table */}
      {result && (
        <div className="result-table">
          <h3>Updated Item</h3>
          <table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{unit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Inventory Table */}
      <div className="inventory-table">
        <h3>Updated Inventory</h3>
        <table>
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
            {loadInventory().map((item, index) => (
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

      {/* Back button */}
      <button onClick={handleBackButton} className="back-btn">Back to Home</button>
    </div>
  );
};

export default UpdateItem;
