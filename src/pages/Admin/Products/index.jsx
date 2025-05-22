import React, { useState } from 'react';
import './styles.css';

const Products = () => {
  const [productList] = useState([
    { id: 1, name: 'Premium Leather Wallet', category: 'Accessories', price: 89.99, stock: 35 },
    { id: 2, name: 'Custom Engraved Watch', category: 'Watches', price: 199.99, stock: 12 },
    { id: 3, name: 'Handcrafted Belt', category: 'Accessories', price: 59.99, stock: 28 },
    { id: 4, name: 'Leather Smartphone Case', category: 'Tech Accessories', price: 39.99, stock: 42 },
    { id: 5, name: 'Silver Tie Clip', category: 'Accessories', price: 29.99, stock: 50 },
    { id: 6, name: 'Leather Notebook Cover', category: 'Stationery', price: 49.99, stock: 18 },
    { id: 7, name: 'Designer Sunglasses', category: 'Eyewear', price: 129.99, stock: 15 },
    { id: 8, name: 'Wooden Bow Tie', category: 'Accessories', price: 34.99, stock: 22 },
  ]);
  
  return (
    <div className="products-container">
      <div className="products-header">
        <h2>Product Management</h2>
        <div className="products-actions">
          <button className="add-product-btn">Add New Product</button>
          <div className="search-container">
            <input type="text" placeholder="Search products..." className="search-input" />
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>
      
      <div className="products-filters">
        <div className="filter-group">
          <label>Category:</label>
          <select>
            <option value="">All Categories</option>
            <option value="accessories">Accessories</option>
            <option value="watches">Watches</option>
            <option value="tech">Tech Accessories</option>
            <option value="stationery">Stationery</option>
            <option value="eyewear">Eyewear</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Price Range:</label>
          <select>
            <option value="">All Prices</option>
            <option value="budget">Under $50</option>
            <option value="mid">$50 - $100</option>
            <option value="premium">$100+</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Stock Status:</label>
          <select>
            <option value="">All</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock (Less than 15)</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>
      
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map(product => (
              <tr key={product.id}>
                <td>#{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <span className={`stock-badge ${product.stock < 15 ? 'low-stock' : 'in-stock'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="action-buttons">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination">
        <button className="pagination-btn">Previous</button>
        <span className="pagination-page active">1</span>
        <span className="pagination-page">2</span>
        <span className="pagination-page">3</span>
        <button className="pagination-btn">Next</button>
      </div>
    </div>
  );
};

export default Products; 