import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import './login.css'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      if (res.data.user.role === 'admin') navigate('/add-product');
      else navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className='log'>

    <form className='login' onSubmit={handleSubmit}>
      <input className='input' type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input className='input' type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;