import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components_css/RemoveLastItem.css';

const RemoveFirstItem = () => {
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

  // Handle removing the first item from the inventory (stack principle with unshift/shift)
  const handleRemoveFirstItem = () => {
    // Load current inventory from localStorage
    const inventory = loadInventory();

    if (inventory.length === 0) {
      alert('Inventory is empty!');
      return;
    }

    // Remove the first item (oldest) from the stack using shift
    const removedItem = inventory.shift();

    // Save the updated inventory back to localStorage
    saveInventory(inventory);

    // Set the result to display the removed item
    setResult(removedItem);
  };

  // Navigate back to the home page
  const handleBackButton = () => {
    navigate('/'); // Navigate back to the IndexPage
  };

  return (
    <div className="remove-first-item-container">
      <h2>Remove Top Item(stack)</h2>
      <button type="button" onClick={handleRemoveFirstItem}>Remove Top Item</button>

      {/* Result Table */}
      {result && (
        <div className="result-table">
          <h3>Removed Item</h3>
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
              <tr>
                <td>{result.id}</td>
                <td>{result.name}</td>
                <td>{result.quantity}</td>
                <td>{result.price}</td>
                <td>{result.unit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Updated Inventory Table */}
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

export default RemoveFirstItem;
