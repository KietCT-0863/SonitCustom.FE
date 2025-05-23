import React, { useState, useEffect } from 'react';
import './styles.css';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    stockStatus: ''
  });
  const [productList, setProductList] = useState([
    { id: 1, name: 'Premium Leather Wallet', category: 'Accessories', price: 89.99, stock: 35 },
    { id: 2, name: 'Custom Engraved Watch', category: 'Watches', price: 199.99, stock: 12 },
    { id: 3, name: 'Handcrafted Belt', category: 'Accessories', price: 59.99, stock: 28 },
    { id: 4, name: 'Leather Smartphone Case', category: 'Tech Accessories', price: 39.99, stock: 42 },
    { id: 5, name: 'Silver Tie Clip', category: 'Accessories', price: 29.99, stock: 50 },
    { id: 6, name: 'Leather Notebook Cover', category: 'Stationery', price: 49.99, stock: 18 },
    { id: 7, name: 'Designer Sunglasses', category: 'Eyewear', price: 129.99, stock: 15 },
    { id: 8, name: 'Wooden Bow Tie', category: 'Accessories', price: 34.99, stock: 22 },
  ]);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    
    // Simulate filter loading
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you would perform the search here
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };
  
  // Get stock status class
  const getStockStatusClass = (stock) => {
    if (stock <= 0) return 'status-danger';
    if (stock < 15) return 'status-warning';
    return 'status-success';
  };

  if (loading) {
    return (
      <div className="products-container">
        {/* Header skeleton */}
        <div className="admin-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="section-header" style={{ marginBottom: 0 }}>
            <div className="admin-skeleton" style={{ height: '1.8rem', width: '200px' }}></div>
            <div className="admin-skeleton" style={{ height: '2.2rem', width: '180px' }}></div>
          </div>
        </div>
        
        {/* Filters skeleton */}
        <div className="admin-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="admin-skeleton" style={{ height: '42px', width: '100%' }}></div>
        </div>
        
        {/* Table skeleton */}
        <div className="admin-recent-section">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i}>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '30%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '80%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '60%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '40%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '30%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '90%' }}></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      {/* Header with button */}
      <div className="admin-card">
        <div className="section-header">
          <div>
            <h2>Product Management</h2>
            <p className="section-subtitle">Manage your store's inventory</p>
          </div>
          <div className="header-actions">
            <button className="admin-action-button">
              <span>➕</span> Add Product
            </button>
          </div>
        </div>
      </div>
      
      {/* Filter controls */}
      <div className="admin-card filter-controls">
        <form onSubmit={handleSearch} className="search-filters-container">
          <div className="admin-search-container">
            <span className="admin-search-icon">🔍</span>
            <input 
              type="text" 
              className="admin-search-input" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="admin-action-button search-button">Search</button>
          </div>
          
          <div className="filters-row">
            <div className="admin-form-group">
              <label htmlFor="category" className="admin-form-label">Category:</label>
              <select 
                id="category"
                name="category"
                className="admin-form-input"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="accessories">Accessories</option>
                <option value="watches">Watches</option>
                <option value="tech">Tech Accessories</option>
                <option value="stationery">Stationery</option>
                <option value="eyewear">Eyewear</option>
              </select>
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="priceRange" className="admin-form-label">Price Range:</label>
              <select 
                id="priceRange"
                name="priceRange"
                className="admin-form-input"
                value={filters.priceRange}
                onChange={handleFilterChange}
              >
                <option value="">All Prices</option>
                <option value="budget">Under $50</option>
                <option value="mid">$50 - $100</option>
                <option value="premium">$100+</option>
              </select>
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="stockStatus" className="admin-form-label">Stock Status:</label>
              <select 
                id="stockStatus"
                name="stockStatus"
                className="admin-form-input"
                value={filters.stockStatus}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock (Less than 15)</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
            
            {(filters.category || filters.priceRange || filters.stockStatus) && (
              <button 
                className="admin-action-button secondary clear-filters-btn"
                onClick={() => setFilters({ category: '', priceRange: '', stockStatus: '' })}
                type="button"
              >
                Clear Filters
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Products table */}
      <div className="admin-recent-section">
        <div className="admin-table-container">
          <table className="admin-table">
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
              {productList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    <div className="admin-empty-state">
                      <div className="admin-empty-icon">📦</div>
                      <h3 className="admin-empty-title">No products found</h3>
                      <p className="admin-empty-text">Try adjusting your filters or add a new product</p>
                    </div>
                  </td>
                </tr>
              ) : (
                productList.map(product => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td><strong>{product.name}</strong></td>
                    <td>{product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <span className={`admin-status ${getStockStatusClass(product.stock)}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button className="admin-action-btn view" title="View details">
                          <span>👁️</span>
                        </button>
                        <button className="admin-action-btn edit" title="Edit product">
                          <span>✏️</span>
                        </button>
                        <button className="admin-action-btn delete" title="Delete product">
                          <span>🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="pagination-container">
          <div className="pagination-info">Showing 1-8 of 20 products</div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>Previous</button>
            <div className="pagination-pages">
              <button className="pagination-page active">1</button>
              <button className="pagination-page">2</button>
              <button className="pagination-page">3</button>
            </div>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 