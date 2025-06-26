import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components_css/ReduceQuantity.css';

const ReduceQuantity = () => {
  const [id, setId] = useState('');
  const [quantityToReduce, setQuantityToReduce] = useState('');
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

  // Handle reducing quantity from an existing item
  const handleReduceQuantity = () => {
    if (!id || !quantityToReduce) {
      alert('Please fill all fields!');
      return;
    }

    // Load current inventory from localStorage
    const inventory = loadInventory();

    // Find the item by its ID
    const item = inventory.find((item) => item.id === parseInt(id));
    if (!item) {
      alert('Item not found!');
      return;
    }

    // Check if the quantity to reduce is less than the current quantity
    if (item.quantity < parseInt(quantityToReduce)) {
      alert('Insufficient quantity!');
      return;
    }

    // Reduce quantity from the item
    item.quantity -= parseInt(quantityToReduce);

    // Save the updated inventory back to localStorage
    saveInventory(inventory);

    // Set the result to display the updated inventory
    setResult(`Item ID: ${id}, New Quantity: ${item.quantity}`);
  };

  // Navigate back to the home page
  const handleBackButton = () => {
    navigate('/'); // Navigate back to the IndexPage
  };

  return (
    <div className="reduce-quantity-container">
      <h2>Reduce Quantity of Item</h2>
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
          <label htmlFor="quantityToReduce">Quantity to Reduce</label>
          <input
            type="number"
            id="quantityToReduce"
            value={quantityToReduce}
            onChange={(e) => setQuantityToReduce(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleReduceQuantity}>Reduce Quantity</button>
      </form>

      <div className="result">
        <h3>Updated Inventory:</h3>
        <pre>{result}</pre>
      </div>

      {/* Inventory Table */}
      <div className="inventory-table">
        <h3>All Items in Inventory</h3>
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

export default ReduceQuantity;
