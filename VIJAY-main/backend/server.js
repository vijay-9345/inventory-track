// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const inventoryRoutes = require('./routes/inventoryRoutes'); // Import the routes
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://vijay824851:vijay824851@cluster0.sj4wtkg.mongodb.net/inventory?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('➡ Make sure MongoDB is running on localhost:27017');
});
db.once('open', () => {
  console.log('✅ MongoDB connected');
});

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// API routes
app.use('/api/inventory', inventoryRoutes); // Mount the inventory routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
