import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../config/api.config';
import { useUser } from '../../../contexts/UserContext';
import './styles.css';

const Categories = () => {
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentCategory, setCurrentCategory] = useState({ cateName: '', prefix: '' });
  const [formError, setFormError] = useState('');

  // Check if user is authenticated and is an admin
  useEffect(() => {
    // If user data is loaded and user is not an admin, redirect to login
    if (!loading && (!user || !isAdmin())) {
      navigate('/login', { 
        state: { 
          from: '/admin/categories',
          message: 'You need to be logged in as an admin to access this page.' 
        } 
      });
    }
  }, [user, isAdmin, navigate]);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get('/Category');
      setCategories(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter categories based on search term
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  const filteredCategories = searchTerm
    ? categories.filter(category => 
        category.cateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.prefix.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories;

  const openAddModal = () => {
    setModalMode('add');
    setCurrentCategory({ cateName: '', prefix: '' });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setModalMode('edit');
    setCurrentCategory({
      cateId: category.cateId,
      cateName: category.cateName,
      prefix: category.prefix
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!currentCategory.cateName.trim()) {
      setFormError('Category name is required');
      return false;
    }
    if (!currentCategory.prefix.trim()) {
      setFormError('Prefix is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      if (!isAdmin()) {
        setFormError('You must be an admin to perform this action.');
        setLoading(false);
        return;
      }
      
      if (modalMode === 'add') {
        // Create new category
        await api.post(
          '/Category',
          currentCategory.cateName
        );
      } else {
        // Update existing category
        await api.put(
          `/Category/${currentCategory.cateId}`,
          {
            cateName: currentCategory.cateName,
            prefix: currentCategory.prefix
          }
        );
      }
      
      // Refresh categories list
      fetchCategories();
      closeModal();
    } catch (error) {
      console.error('Error saving category:', error);
      
      if (error.message && error.message.includes('401')) {
        // Authentication error
        setFormError('Session expired. Please log in again.');
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              from: '/admin/categories',
              message: 'Your session has expired. Please log in again.' 
            } 
          });
        }, 2000);
      } else {
        setFormError(error.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    setLoading(true);
    try {
      if (!isAdmin()) {
        alert('You must be an admin to delete categories.');
        setLoading(false);
        return;
      }
      
      await api.delete(`/Category/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      
      if (error.message && error.message.includes('401')) {
        // Authentication error
        alert('Session expired. Please log in again.');
        navigate('/login', { 
          state: { 
            from: '/admin/categories',
            message: 'Your session has expired. Please log in again.' 
          } 
        });
      } else {
        alert(error.message || 'Failed to delete category');
      }
    } finally {
      setLoading(false);
    }
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
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i}>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '30%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '80%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '60%' }}></div></td>
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
            <h2>Category Management</h2>
            <p className="section-subtitle">Manage product categories</p>
          </div>
          <div className="header-actions">
            <button className="admin-action-button" onClick={openAddModal}>
              <span>➕</span> Add Category
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
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="admin-action-button search-button">Search</button>
          </div>
        </form>
      </div>
      
      {/* Categories table */}
      <div className="admin-recent-section">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Prefix</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-state">
                    <div className="admin-empty-state">
                      <div className="admin-empty-icon">📋</div>
                      <h3 className="admin-empty-title">No categories found</h3>
                      <p className="admin-empty-text">
                        {searchTerm ? "Try a different search term" : "Add a new category to get started"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCategories.map(category => (
                  <tr key={category.cateId}>
                    <td>#{category.cateId}</td>
                    <td><strong>{category.cateName}</strong></td>
                    <td>{category.prefix}</td>
                    <td>
                      <div className="admin-actions">
                        <button 
                          className="admin-action-btn edit" 
                          title="Edit category"
                          onClick={() => openEditModal(category)}
                        >
                          <span>✏️</span>
                        </button>
                        <button 
                          className="admin-action-btn delete" 
                          title="Delete category"
                          onClick={() => handleDelete(category.cateId)}
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

      {/* Modal for Add/Edit Category */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{modalMode === 'add' ? 'Add New Category' : 'Edit Category'}</h3>
              <button className="admin-modal-close" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal-content">
              {formError && (
                <div className="admin-form-error">
                  {formError}
                </div>
              )}
              
              <div className="admin-form-group">
                <label htmlFor="cateName" className="admin-form-label">Category Name:</label>
                <input
                  type="text"
                  id="cateName"
                  name="cateName"
                  className="admin-form-input"
                  value={currentCategory.cateName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="admin-form-group">
                <label htmlFor="prefix" className="admin-form-label">Prefix:</label>
                <input
                  type="text"
                  id="prefix"
                  name="prefix"
                  className="admin-form-input"
                  value={currentCategory.prefix}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-button secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-button">
                  {modalMode === 'add' ? 'Add Category' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories; 