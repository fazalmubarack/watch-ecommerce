const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/wishlist', require('./routes/wishlist'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));