import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

const PremiumWatches = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products/premium');
        setProducts(res.data);
      } catch (error) {
        alert('Unauthorized access');
      }
    };
    if (token) fetchProducts();
  }, [token]);

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
    <div>
      <h1>Premium Watches</h1>
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

export default PremiumWatches;