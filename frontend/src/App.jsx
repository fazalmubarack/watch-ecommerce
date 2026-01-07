import React from 'react';
// import './styles.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PremiumWatches from './pages/PremiumWatches.jsx';
import AddProduct from './pages/AddProduct.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
 // Add this line at the top
 import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/premium" element={<PremiumWatches />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
}

export default App;
