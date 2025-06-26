import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './components_css/AddQuantity.css';

const AddQuantity = () => {
  const [id, setId] = useState('');
  const [quantityToAdd, setQuantityToAdd] = useState('');
  const [inventory, setInventory] = useState([]); // State to hold the inventory data
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

  // Handle adding quantity to an existing item
  const handleAddQuantity = () => {
    if (!id || !quantityToAdd) {
      alert('Please fill all fields!');
      return;
    }

    // Load current inventory from localStorage
    const updatedInventory = [...inventory];

    // Find the item by its ID
    const item = updatedInventory.find((item) => item.id === parseInt(id));
    if (!item) {
      alert('Item not found!');
      return;
    }

    // Add the quantity to the existing quantity
    item.quantity += parseInt(quantityToAdd);

    // Save the updated inventory back to localStorage
    saveInventory(updatedInventory);

    // Update the local state to reflect the new inventory
    setInventory(updatedInventory);

    // Set the result to display the updated inventory
    setResult(`
      Item ID: ${item.id}
      Item Name: ${item.name}
      New Quantity: ${item.quantity}
      Price: ${item.price}
      Unit: ${item.unit}
    `);
  };

  // Navigate back to the home page
  const handleBackButton = () => {
    navigate('/'); // Navigate back to the IndexPage
  };

  useEffect(() => {
    // Pre-load the inventory when the component is mounted
    const inventory = loadInventory();
    setInventory(inventory);
  }, []);

  return (
    <div className="add-quantity-container">
      <h2>Add Quantity to Item</h2>
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
          <label htmlFor="quantityToAdd">Quantity to Add</label>
          <input
            type="number"
            id="quantityToAdd"
            value={quantityToAdd}
            onChange={(e) => setQuantityToAdd(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAddQuantity}>Add Quantity</button>
      </form>

      <div className="result">
        <h3>Updated Inventory:</h3>
        <pre>{result}</pre>
      </div>

      <div className="inventory-table">
        <h3>All Items in Inventory:</h3>
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
            {inventory.map((item, index) => (
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
      <button onClick={handleBackButton}>Back to Home</button>
    </div>
  );
};

export default AddQuantity;
