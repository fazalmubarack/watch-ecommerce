const express = require('express');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user }).populate('products.productId');
    res.json(cart || { products: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Add to cart
router.post('/add', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user });
    if (!cart) cart = new Cart({ userId: req.user, products: [] });
    const existing = cart.products.find(p => p.productId.toString() === productId);
    if (existing) existing.quantity += quantity || 1;
    else cart.products.push({ productId, quantity: quantity || 1 });
    await cart.save();
    res.json({ message: 'Added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart' });
  }
});

// Remove from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user });
    if (cart) {
      cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId);
      await cart.save();
    }
    res.json({ message: 'Removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart' });
  }
});

module.exports = router;