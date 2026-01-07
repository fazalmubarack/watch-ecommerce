const express = require('express');
const Wishlist = require('../models/Wishlist');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user }).populate('products');
    res.json(wishlist || { products: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
});

// Add to wishlist
router.post('/add', auth, async (req, res) => {
  const { productId } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user });
    if (!wishlist) wishlist = new Wishlist({ userId: req.user, products: [] });
    if (!wishlist.products.includes(productId)) wishlist.products.push(productId);
    await wishlist.save();
    res.json({ message: 'Added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist' });
  }
});

// Remove from wishlist
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(p => p.toString() !== req.params.productId);
      await wishlist.save();
    }
    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist' });
  }
});

module.exports = router;