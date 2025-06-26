import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './components_css/ViewItems.css';

const ViewItems = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const navigate = useNavigate(); // Initialize navigate for back button functionality

  // Load items from backend API
  useEffect(() => {
    fetch('/api/inventory')
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch(() => setInventory([]));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  // Filter items based on search term and price range
  const filteredInventory = inventory.filter((item) => {
    const matchesSearchTerm =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm);
    const matchesPriceRange =
      (!priceRange.min || item.price >= parseFloat(priceRange.min)) &&
      (!priceRange.max || item.price <= parseFloat(priceRange.max));

    return matchesSearchTerm && matchesPriceRange;
  });

  // Back button functionality
  const handleBackButton = () => {
    navigate('/'); // Navigate back to the home or index page
  };

  return (
    <div className="view-items-container">
      <h2>View Items</h2>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by Name or ID"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="price-range">
          <input
            type="number"
            placeholder="Min Price"
            name="min"
            value={priceRange.min}
            onChange={handlePriceRangeChange}
          />
          <input
            type="number"
            placeholder="Max Price"
            name="max"
            value={priceRange.max}
            onChange={handlePriceRangeChange}
          />
        </div>
      </div>

      <div className="inventory-table">
        <h3>All Items</h3>
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Stock Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan="6">No items found matching the criteria.</td>
              </tr>
            ) : (
              filteredInventory.map((item) => (
                <tr
                  key={item.id}
                  className={item.quantity < 10 ? 'low-stock' : item.quantity > 100 ? 'high-stock' : ''}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.unit}</td>
                  <td>
                    {item.quantity < 10 ? (
                      <span className="low-stock-label">Low Stock</span>
                    ) : item.quantity > 100 ? (
                      <span className="high-stock-label">High Stock</span>
                    ) : (
                      'Normal Stock'
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Back Button to return to the Index Page */}
      <button onClick={handleBackButton} className="back-button">Back</button>
    </div>
  );
};

export default ViewItems;
