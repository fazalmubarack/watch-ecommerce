import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav>
      <h2>E-Watch</h2>
      <div>
      <Link to="/">Home</Link>
      {!token ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          {role === 'admin' && <Link to="/add-product">Add Product</Link>}
          {role === 'user' && (
            <>
              <Link to="/cart">Cart</Link>
              <Link to="/wishlist">Wishlist</Link>
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      </div>
    </nav>
  );
};

export default Navbar;