const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  isPremium: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', productSchema);