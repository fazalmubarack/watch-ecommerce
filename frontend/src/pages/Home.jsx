
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './home.css';
import Hero from './Hero';

const Home = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!token) {
          // Not logged in: Show public watches
          const res = await api.get('/products/local');
          setProducts(res.data);
        } else {
          // Logged in: Show only premium watches
          const res = await api.get('/products/all');
          setProducts(res.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // If premium fetch fails (e.g., token invalid), fall back to public
        if (token) {
          try {
            const res = await api.get('/products/local');
            setProducts(res.data);
          } catch (fallbackError) {
            console.error('Fallback error:', fallbackError);
          }
        }
      }
    };
    fetchProducts();
  }, [token]);  // Re-fetch when login status changes

  const addToCart = async (productId) => {
    try {
      await api.post('/cart/add', { productId });
      alert('Added to cart');
    } catch (error) {
      alert('Error adding to cart');
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await api.post('/wishlist/add', { productId });
      alert('Added to wishlist');
    } catch (error) {
      alert('Error adding to wishlist');
    }
  };

  return (
    <div class="home-container">
      <Hero/>
      <h1>{token ? 'Premium Watches  & Local Edition Watches' : 'Local Edition Watches'}</h1>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            {product.image && <img src={product.image} alt={product.name} width="100" />}
            {token && role === 'user' && (
              <>
                <button onClick={() => addToCart(product._id)}>Add to Cart</button>
                <button onClick={() => addToWishlist(product._id)}>Add to Wishlist</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;