import React, { useState } from 'react';
import api from '../services/api.js';
import './login.css'

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className='log'>
    <form className='login' onSubmit={handleSubmit}>
      <input className='input' type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} required />
      <input className='input1' type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input className='input1' type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      
      <button type="submit">Register</button>
    </form>
    </div>
  );
};

export default Register;