// backend/server.js
const express = require('express');
const cors = require('cors');
const products = require('./products.json');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Endpoint to get product data
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Endpoint to handle checkout
app.post('/api/checkout', (req, res) => {
  const { items } = req.body;
  if (items) {
    res.json({ success: true, message: "Checkout complete!" });
  } else {
    res.status(400).json({ success: false, message: "No items to checkout." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
