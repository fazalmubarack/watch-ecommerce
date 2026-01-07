import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

const Cart = () => {
  const [cart, setCart] = useState({ products: [] });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get('/cart');
        setCart(res.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      setCart(prev => ({ ...prev, products: prev.products.filter(p => p.productId._id !== productId) }));
    } catch (error) {
      alert('Error removing from cart');
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.products.length > 0 ? (
        cart.products.map((item) => (
          <div key={item.productId._id}>
            <h3>{item.productId.name}</h3>
            <img src={item.productId.image} width="100" />
            <p>Quantity: {item.quantity}</p>
            <p>${item.productId.price * item.quantity}</p>
            <button onClick={() => removeFromCart(item.productId._id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;