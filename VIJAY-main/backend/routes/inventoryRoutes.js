// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController'); // Import the controller

// Define routes and link them to controller methods

// Get all inventory items
router.get('/', inventoryController.getAllItems);

// Add a new item to the inventory
router.post('/add', inventoryController.addItem);

// Update an item in the inventory
router.put('/update/:id', inventoryController.updateItem);

// Delete an item from the inventory
router.delete('/delete/:id', inventoryController.deleteItem);

// Increase the quantity of an item
router.put('/add-quantity/:id', inventoryController.addQuantity);

// Decrease the quantity of an item
router.put('/reduce-quantity/:id', inventoryController.reduceQuantity);

module.exports = router;
