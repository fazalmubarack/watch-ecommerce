const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Public: Get Local Edition Watches
router.get('/local', async (req, res) => {
  try {
    const products = await Product.find({ isPremium: false });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Protected: Get Premium Watches
router.get('/premium', auth, async (req, res) => {
  try {
    const products = await Product.find({ isPremium: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Public: Get all products
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Protected: Add a new product (admin only)
router.post('/add', auth, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: 'Access denied' });
  const { name, description, price, image, isPremium } = req.body;
  try {
    const product = new Product({ name, description, price, image, isPremium: isPremium || false });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Error adding product', error: error.message });
  }
});

// ... existing code ...

// Protected: Update a product (admin only)
router.put('/update/:id', auth, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: 'Access denied' });
  const { name, description, price, image, isPremium } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, isPremium },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated', product });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
});

// Protected: Delete a product (admin only)
router.delete('/delete/:id', auth, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

// ... existing code ...
module.exports = router;