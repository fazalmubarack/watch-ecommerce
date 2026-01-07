import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState({ products: [] });

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get('/wishlist');
        setWishlist(res.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/remove/${productId}`);
      setWishlist(prev => ({ ...prev, products: prev.products.filter(p => p._id !== productId) }));
    } catch (error) {
      alert('Error removing from wishlist');
    }
  };

  return (
    <div>
      <h1>Your Wishlist</h1>
      {wishlist.products.length > 0 ? (
        wishlist.products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} width="100" />
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => removeFromWishlist(product._id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;