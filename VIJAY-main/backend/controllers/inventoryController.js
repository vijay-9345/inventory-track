// controllers/inventoryController.js
const InventoryItem = require('../models/InventoryItem');

// Get all inventory items
exports.getAllItems = async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new item
exports.addItem = async (req, res) => {
  try {
    const { id, name, quantity, price, unit } = req.body;
    const existing = await InventoryItem.findOne({ id });
    if (existing) {
      return res.status(400).json({ error: 'Item with this ID already exists.' });
    }
    const newItem = new InventoryItem({ id, name, quantity, price, unit });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, unit } = req.body;
    const updated = await InventoryItem.findOneAndUpdate(
      { id: parseInt(id) },
      { name, price, unit },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Item not found.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await InventoryItem.findOneAndDelete({ id: parseInt(id) });
    if (!deleted) return res.status(404).json({ error: 'Item not found.' });
    res.json({ message: 'Item deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add quantity
exports.addQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const item = await InventoryItem.findOne({ id: parseInt(id) });
    if (!item) return res.status(404).json({ error: 'Item not found.' });
    item.quantity += Number(quantity);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reduce quantity
exports.reduceQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const item = await InventoryItem.findOne({ id: parseInt(id) });
    if (!item) return res.status(404).json({ error: 'Item not found.' });
    item.quantity -= Number(quantity);
    if (item.quantity < 0) item.quantity = 0;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
