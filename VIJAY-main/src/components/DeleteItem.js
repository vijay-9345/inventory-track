import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './components_css/DeleteItem.css';

const DeleteItem = () => {
  const [filter, setFilter] = useState('');
  const [result, setResult] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Load items from localStorage
  const loadInventory = () => {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    return inventory;
  };

  const saveInventory = (inventory) => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  };

  // Handle deleting an item by its ID or name
  const handleDeleteItem = (idOrName) => {
    if (!idOrName) {
      alert('Please select an Item to delete!');
      return;
    }

    // Load current inventory from localStorage
    const inventory = loadInventory();

    // Try to find item by ID first
    let itemIndex = inventory.findIndex((item) => item.id === parseInt(idOrName));

    // If not found by ID, try to find by name
    if (itemIndex === -1) {
      itemIndex = inventory.findIndex((item) => item.name.toLowerCase() === idOrName.toLowerCase());
    }

    if (itemIndex === -1) {
      alert('Item not found!');
      return;
    }

    // Remove the item from the inventory
    inventory.splice(itemIndex, 1);

    // Save the updated inventory back to localStorage
    saveInventory(inventory);

    // Set the result to indicate that the item has been deleted
    setResult(`Item with ID/Name "${idOrName}" has been deleted.`);

    // Update filtered items to reflect the removal
    setFilteredItems(inventory.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()) || item.id.toString().includes(filter)));
  };

  // Handle filtering inventory based on the input
  const handleFilterChange = (e) => {
    const searchValue = e.target.value;
    setFilter(searchValue);

    // Filter items based on name or ID
    const inventory = loadInventory();
    const filtered = inventory.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.id.toString().includes(searchValue));
    setFilteredItems(filtered);
  };

  // Navigate back to the home page
  const handleBackButton = () => {
    navigate('/'); // Navigate back to the IndexPage
  };

  // Initialize the filteredItems with all items when the component mounts
  useEffect(() => {
    const inventory = loadInventory();
    setFilteredItems(inventory); // Set the state to display all items initially
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div className="delete-item-container">
      <h2>Delete Item by ID or Name</h2>
      <form>
        <div className="form-group">
          <label htmlFor="filter">Filter by Item ID or Name</label>
          <input
            type="text"
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Enter ID or Name to filter"
          />
        </div>
      </form>

      {/* Display Filtered Items */}
      {filteredItems.length > 0 ? (
        <div className="filtered-items">
          <h3>Filtered Items</h3>
          <table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.unit}</td>
                  <td>
                    <button type="button" onClick={() => handleDeleteItem(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No items match the filter criteria.</p>
      )}

      {/* Deletion Result */}
      {result && (
        <div className="result-table">
          <h3>Deletion Result</h3>
          <p>{result}</p>
        </div>
      )}

      {/* Back button */}
      <button onClick={handleBackButton} className="back-btn">Back to Home</button>
    </div>
  );
};

export default DeleteItem;
