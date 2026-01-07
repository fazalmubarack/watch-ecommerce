
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './addProduct.css';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', isPremium: false });
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);  // Track which product is being edited
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '', image: '', isPremium: false });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products/all');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products/add', form);
      alert('Product added successfully!');
      const res = await api.get('/products/all');
      setProducts(res.data);
      setForm({ name: '', description: '', price: '', image: '', isPremium: false });
    } catch (error) {
      alert('Error adding product');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      isPremium: product.isPremium,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/update/${editingId}`, editForm);
      alert('Product updated successfully!');
      const res = await api.get('/products/all');
      setProducts(res.data);
      setEditingId(null);
    } catch (error) {
      alert('Error updating product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/delete/${id}`);
        alert('Product deleted successfully!');
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Add Product Form */}
      <h2>Add New Product</h2>
      <form onSubmit={handleAddSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <label><br />
          <input
            type="checkbox"
            checked={form.isPremium}
            onChange={(e) => setForm({ ...form, isPremium: e.target.checked })}
          />
          Is Premium Watch?
        </label><br />
        <button type="submit">Add Product</button>
      </form>

      {/* Product List with Edit/Delete */}
      <h2>All Products</h2>
      <div>
        {products.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            {editingId === product._id ? (
              // Edit Form
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  required
                />
                <input
                  type="text"
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                />
                <label><br />
                  <input
                    type="checkbox"
                    checked={editForm.isPremium}
                    onChange={(e) => setEditForm({ ...editForm, isPremium: e.target.checked })}
                  />
                  Is Premium Watch?
                </label><br />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              // Display Product
              <>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <p>${product.price}</p>
                {product.image && <img src={product.image} alt={product.name} width="100" />}
                <p>{product.isPremium ? 'Premium' : 'Public'}</p><br />
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProduct;