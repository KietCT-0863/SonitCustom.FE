import React, { useState, useEffect } from 'react';
import './styles.css';
import ProductService from '../../../services/product.service';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: ''
  });
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    proName: '',
    description: '',
    imgUrl: '',
    price: 0,
    category: 1,
    isCustom: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, id: null });

  // Load products and categories
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getProducts();
      setProductList(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await ProductService.getCategories();
      setCategories(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    
    // Apply filtering
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Filter products by search term in name or description
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  // Filter products based on search term and category
  const filteredProducts = productList.filter(product => {
    const matchesSearch = 
      searchTerm === '' || 
      product.proName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      filters.category === '' || 
      product.category.toLowerCase() === filters.category.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  // Form handling
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };
  
  const validateForm = () => {
    const errors = {};
    if (!formData.proName) errors.proName = 'Product name is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.imgUrl) errors.imgUrl = 'Image URL is required';
    if (formData.price < 0) errors.price = 'Price cannot be negative';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      if (isEditing && currentProduct) {
        // Update: only include changed fields (null otherwise)
        const updateData = {};
        Object.keys(formData).forEach(key => {
          // If the form value is different from the current product's value
          if (formData[key] !== currentProduct[key]) {
            updateData[key] = formData[key];
          } else {
            updateData[key] = null; // Use null for unchanged values
          }
        });
        
        await ProductService.updateProduct(currentProduct.prodId, updateData);
      } else {
        // Create
        await ProductService.createProduct(formData);
      }
      
      setShowModal(false);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (productId) => {
    setLoading(true);
    try {
      await ProductService.deleteProduct(productId);
      fetchProducts(); // Refresh the product list
      setDeleteConfirmation({ show: false, id: null });
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Add new product button handler
  const handleAddNewClick = () => {
    setFormData({
      proName: '',
      description: '',
      imgUrl: '',
      price: 0,
      category: categories.length > 0 ? categories[0].cateId : 1,
      isCustom: false
    });
    setFormErrors({});
    setIsEditing(false);
    setCurrentProduct(null);
    setShowModal(true);
  };
  
  // Edit product button handler
  const handleEditClick = (product) => {
    setFormData({
      proName: product.proName,
      description: product.description,
      imgUrl: product.imgUrl,
      price: product.price,
      category: categories.find(cat => cat.cateName.toLowerCase() === product.category.toLowerCase())?.cateId || 1,
      isCustom: product.isCustom
    });
    setFormErrors({});
    setIsEditing(true);
    setCurrentProduct(product);
    setShowModal(true);
  };
  
  // Get category name from category ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.cateId === categoryId);
    return category ? category.cateName : '';
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
            <button className="admin-action-button" onClick={handleAddNewClick}>
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
                {categories.map(category => (
                  <option key={category.cateId} value={category.cateName}>{category.cateName}</option>
                ))}
              </select>
            </div>
            
            {(filters.category) && (
              <button 
                className="admin-action-button secondary clear-filters-btn"
                onClick={() => setFilters({ category: '' })}
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
                <th>Custom</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
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
                filteredProducts.map(product => (
                  <tr key={product.prodId}>
                    <td>{product.prodId}</td>
                    <td><strong>{product.proName}</strong></td>
                    <td>{product.category}</td>
                    <td>{product.price.toLocaleString('vi-VN')} đ</td>
                    <td>
                      <span className={`admin-status ${product.isCustom ? 'status-success' : 'status-warning'}`}>
                        {product.isCustom ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button 
                          className="admin-action-btn edit" 
                          title="Edit product"
                          onClick={() => handleEditClick(product)}
                        >
                          <span>✏️</span>
                        </button>
                        <button 
                          className="admin-action-btn delete" 
                          title="Delete product"
                          onClick={() => setDeleteConfirmation({ show: true, id: product.prodId })}
                        >
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
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <form onSubmit={handleSubmit}>
                <div className="admin-form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="proName"
                    value={formData.proName}
                    onChange={handleInputChange}
                    className={`admin-form-input ${formErrors.proName ? 'is-invalid' : ''}`}
                  />
                  {formErrors.proName && <div className="admin-form-error">{formErrors.proName}</div>}
                </div>
                
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`admin-form-input ${formErrors.description ? 'is-invalid' : ''}`}
                    rows="3"
                  ></textarea>
                  {formErrors.description && <div className="admin-form-error">{formErrors.description}</div>}
                </div>
                
                <div className="admin-form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="imgUrl"
                    value={formData.imgUrl}
                    onChange={handleInputChange}
                    className={`admin-form-input ${formErrors.imgUrl ? 'is-invalid' : ''}`}
                  />
                  {formErrors.imgUrl && <div className="admin-form-error">{formErrors.imgUrl}</div>}
                </div>
                
                <div className="admin-form-group">
                  <label>Price (VND)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`admin-form-input ${formErrors.price ? 'is-invalid' : ''}`}
                  />
                  {formErrors.price && <div className="admin-form-error">{formErrors.price}</div>}
                </div>
                
                <div className="admin-form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="admin-form-input"
                  >
                    {categories.map(category => (
                      <option key={category.cateId} value={category.cateId}>
                        {category.cateName}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="admin-form-check">
                  <input
                    type="checkbox"
                    id="isCustom"
                    name="isCustom"
                    checked={formData.isCustom}
                    onChange={handleInputChange}
                    className="admin-form-check-input"
                  />
                  <label htmlFor="isCustom" className="admin-form-check-label">
                    Is Custom Product
                  </label>
                </div>
                
                <div className="admin-modal-footer">
                  <button type="button" className="admin-button secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-button primary">
                    {isEditing ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.show && (
        <div className="admin-modal-overlay">
          <div className="admin-modal confirm-modal">
            <div className="admin-modal-header">
              <h3>Confirm Delete</h3>
              <button className="close-button" onClick={() => setDeleteConfirmation({ show: false, id: null })}>×</button>
            </div>
            <div className="admin-modal-body">
              <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="admin-button secondary" onClick={() => setDeleteConfirmation({ show: false, id: null })}>
                Cancel
              </button>
              <button type="button" className="admin-button danger" onClick={() => handleDelete(deleteConfirmation.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products; 