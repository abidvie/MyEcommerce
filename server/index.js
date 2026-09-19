const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MyEcommerce API',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Classic Tee', price: 29.99, category: 'Apparel' },
    { id: 2, name: 'Running Shoes', price: 89.99, category: 'Footwear' },
    { id: 3, name: 'Leather Backpack', price: 74.5, category: 'Accessories' },
  ]);
});

app.listen(PORT, () => {
  console.log(`MyEcommerce API running on http://localhost:${PORT}`);
});
