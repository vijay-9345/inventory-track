const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true }
});

module.exports = mongoose.model('InventoryItem', InventoryItemSchema, 'inventory');
