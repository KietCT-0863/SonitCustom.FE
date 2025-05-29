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
  const [fieldErrors, setFieldErrors] = useState({
    cateName: false,
    prefix: false
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [autoPrefix, setAutoPrefix] = useState('');
  const [updateMode, setUpdateMode] = useState('both'); // 'name', 'prefix', or 'both'

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
    setFieldErrors({ cateName: false, prefix: false });
    setSuccessMessage('');
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
    setFieldErrors({ cateName: false, prefix: false });
    setSuccessMessage('');
    setUpdateMode('both'); // Default to updating both fields
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to generate a prefix from category name (similar to backend logic)
  const generatePrefixPreview = (categoryName) => {
    if (!categoryName.trim()) return '';
    
    const words = categoryName.toLowerCase().split(' ').filter(word => word.length > 0);
    
    if (words.length === 0) return '';
    
    if (words.length === 1) {
      // For single words, take first 3 characters
      return words[0].length >= 3 ? words[0].substring(0, 3) : words[0].padEnd(3, 'x');
    } else {
      // For multiple words, take first letter of each word
      return words.map(word => word[0]).join('');
    }
  };

  // Preview for edit mode
  useEffect(() => {
    if (modalMode === 'edit' && currentCategory.cateName && !currentCategory.prefix) {
      const prefix = generatePrefixPreview(currentCategory.cateName);
      setAutoPrefix(prefix);
    } else if (modalMode === 'edit') {
      setAutoPrefix('');
    }
  }, [currentCategory.cateName, currentCategory.prefix, modalMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory(prev => ({ ...prev, [name]: value }));
    
    // Generate auto-prefix preview for new categories
    if (name === 'cateName' && modalMode === 'add') {
      const prefix = generatePrefixPreview(value);
      setAutoPrefix(prefix);
    }
    
    // Reset error for this field
    setFieldErrors(prev => ({ ...prev, [name]: false }));
    
    // If there's a form error, clear it when user starts typing
    if (formError) {
      setFormError('');
    }
    
    // Check for duplicates in real-time for better UX
    if (value.trim()) {
      // Only check after the user has typed at least 2 characters
      if (value.length > 2) {
        if (name === 'cateName') {
          // Check if this name exists in any other category
          const isDuplicate = categories.some(category => 
            category.cateName.toLowerCase() === value.toLowerCase() && 
            (modalMode === 'add' || category.cateId !== currentCategory.cateId)
          );
          
          if (isDuplicate) {
            setFieldErrors(prev => ({ ...prev, cateName: true }));
            setFormError(`Category name '${value}' already exists`);
          }
        } else if (name === 'prefix') {
          // Check if this prefix exists in any other category
          const isDuplicate = categories.some(category => 
            category.prefix.toLowerCase() === value.toLowerCase() && 
            (modalMode === 'add' || category.cateId !== currentCategory.cateId)
          );
          
          if (isDuplicate) {
            setFieldErrors(prev => ({ ...prev, prefix: true }));
            setFormError(`Prefix '${value}' is already in use`);
          }
        }
      }
    }
  };

  // Get the original category for comparison in edit mode
  const getOriginalCategory = () => {
    if (modalMode !== 'edit' || !currentCategory.cateId) return null;
    return categories.find(c => c.cateId === currentCategory.cateId);
  };

  const validateForm = () => {
    // Reset field errors
    setFieldErrors({
      cateName: false,
      prefix: false
    });
    
    // For adding new categories, category name is required
    if (modalMode === 'add') {
      if (!currentCategory.cateName.trim()) {
        setFormError('Category name is required when creating a new category');
        setFieldErrors(prev => ({ ...prev, cateName: true }));
        return false;
      }
      
      // Check if category name already exists
      const nameExists = categories.some(
        category => category.cateName.toLowerCase() === currentCategory.cateName.toLowerCase()
      );
      
      if (nameExists) {
        setFormError(`Category with name '${currentCategory.cateName}' already exists`);
        setFieldErrors(prev => ({ ...prev, cateName: true }));
        return false;
      }
      
      // Prefix is optional for new categories as it will be auto-generated
      return true;
    } 
    // For updating categories, validate based on update mode
    else if (modalMode === 'edit') {
      const originalCategory = getOriginalCategory();
      if (!originalCategory) {
        setFormError('Cannot find original category data');
        return false;
      }

      // Validate based on update mode
      switch (updateMode) {
        case 'name':
          // Validate name only
          if (!currentCategory.cateName.trim()) {
            setFormError('Category name is required');
            setFieldErrors(prev => ({ ...prev, cateName: true }));
            return false;
          }
          
          // Check for duplicates
          if (currentCategory.cateName !== originalCategory.cateName) {
            const nameExists = categories.some(
              category => 
                category.cateName.toLowerCase() === currentCategory.cateName.toLowerCase() && 
                category.cateId !== currentCategory.cateId
            );
            
            if (nameExists) {
              setFormError(`Category name '${currentCategory.cateName}' already exists`);
              setFieldErrors(prev => ({ ...prev, cateName: true }));
              return false;
            }
          }
          break;
          
        case 'prefix':
          // Validate prefix only
          if (!currentCategory.prefix.trim()) {
            setFormError('Prefix is required');
            setFieldErrors(prev => ({ ...prev, prefix: true }));
            return false;
          }
          
          // Check for duplicates
          if (currentCategory.prefix !== originalCategory.prefix) {
            const prefixExists = categories.some(
              category => 
                category.prefix.toLowerCase() === currentCategory.prefix.toLowerCase() && 
                category.cateId !== currentCategory.cateId
            );
            
            if (prefixExists) {
              setFormError(`Prefix '${currentCategory.prefix}' is already in use by another category`);
              setFieldErrors(prev => ({ ...prev, prefix: true }));
              return false;
            }
          }
          break;
          
        case 'both':
          // Validate both fields
          if (!currentCategory.cateName.trim()) {
            setFormError('Category name is required');
            setFieldErrors(prev => ({ ...prev, cateName: true }));
            return false;
          }
          
          if (!currentCategory.prefix.trim()) {
            setFormError('Prefix is required');
            setFieldErrors(prev => ({ ...prev, prefix: true }));
            return false;
          }
          
          // Check for duplicate name
          if (currentCategory.cateName !== originalCategory.cateName) {
            const nameExists = categories.some(
              category => 
                category.cateName.toLowerCase() === currentCategory.cateName.toLowerCase() && 
                category.cateId !== currentCategory.cateId
            );
            
            if (nameExists) {
              setFormError(`Category name '${currentCategory.cateName}' already exists`);
              setFieldErrors(prev => ({ ...prev, cateName: true }));
              return false;
            }
          }
          
          // Check for duplicate prefix
          if (currentCategory.prefix !== originalCategory.prefix) {
            const prefixExists = categories.some(
              category => 
                category.prefix.toLowerCase() === currentCategory.prefix.toLowerCase() && 
                category.cateId !== currentCategory.cateId
            );
            
            if (prefixExists) {
              setFormError(`Prefix '${currentCategory.prefix}' is already in use by another category`);
              setFieldErrors(prev => ({ ...prev, prefix: true }));
              return false;
            }
          }
          break;
      }
      
      return true;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccessMessage('');
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
        setSuccessMessage('Category created successfully!');
      } else {
        // Update existing category
        const originalCategory = getOriginalCategory();
        if (!originalCategory) {
          setFormError('Cannot find original category data');
          setLoading(false);
          return;
        }
        
        const updatePayload = {};
        
        // Set fields based on update mode
        switch (updateMode) {
          case 'name':
            // Update only the name, generate new prefix automatically
            updatePayload.cateName = currentCategory.cateName;
            updatePayload.prefix = ""; // Empty prefix triggers auto-generation
            break;
          case 'prefix':
            // Update only the prefix, keep original name
            updatePayload.cateName = "";
            updatePayload.prefix = currentCategory.prefix;
            break;
          case 'both':
            // Update both fields
            updatePayload.cateName = currentCategory.cateName;
            updatePayload.prefix = currentCategory.prefix;
            break;
          default:
            updatePayload.cateName = currentCategory.cateName;
            updatePayload.prefix = currentCategory.prefix;
        }
        
        await api.put(
          `/Category/${currentCategory.cateId}`,
          updatePayload
        );
        setSuccessMessage('Category updated successfully!');
      }
      
      // Refresh categories list
      fetchCategories();
      
      // Don't close modal immediately, show success message first
      setTimeout(() => {
        closeModal();
      }, 1500);
      
    } catch (error) {
      console.error('Error saving category:', error);
      
      let errorMessage = error.message || 'An error occurred. Please try again.';
      
      // Handle conflict errors (409)
      if (error.status === 409 || (error.message && error.message.includes('đã tồn tại'))) {
        if (error.message && error.message.includes('tên')) {
          // Extract the category name from the error message if possible
          const nameMatch = error.message.match(/'([^']+)'/);
          const cateName = nameMatch ? nameMatch[1] : currentCategory.cateName;
          
          // Check if this is the same as the current category name (when only updating prefix)
          const originalCategory = getOriginalCategory();
          if (originalCategory && cateName === originalCategory.cateName && !currentCategory.cateName.trim()) {
            // This is a special case - we're trying to update only the prefix but the backend
            // is incorrectly validating the original name against itself
            errorMessage = `Error updating category. Try providing both name and prefix together.`;
          } else {
            errorMessage = `Category name '${cateName}' already exists. Please choose a different name.`;
          }
          
          setFieldErrors(prev => ({ ...prev, cateName: true }));
        } else if (error.message && error.message.includes('prefix')) {
          errorMessage = `Prefix '${currentCategory.prefix}' is already in use. Please choose a different prefix.`;
          setFieldErrors(prev => ({ ...prev, prefix: true }));
        }
      }
      
      // Extract more specific error messages if available
      if (error.errors) {
        const errorDetails = [];
        for (const key in error.errors) {
          errorDetails.push(error.errors[key].join(', '));
        }
        if (errorDetails.length > 0) {
          errorMessage = errorDetails.join('; ');
        }
      }
      
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
        setFormError(errorMessage);
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
      } else if (
        error.message && (
          error.message.includes('entity changes') ||
          error.message.includes('FOREIGN KEY constraint') ||
          error.message.includes('reference constraint')
        )
      ) {
        // This is the specific error when category has dependent items
        alert('This category cannot be deleted because it has associated products. Please reassign or remove all products in this category first.');
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
              
              {successMessage && (
                <div className="admin-form-success">
                  {successMessage}
                </div>
              )}
              
              {/* Update mode selector (only for edit mode) */}
              {modalMode === 'edit' && (
                <div className="update-mode-selector">
                  <h4>What would you like to update?</h4>
                  <div className="update-mode-options">
                    <label className={`update-mode-option ${updateMode === 'name' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="updateMode" 
                        value="name" 
                        checked={updateMode === 'name'} 
                        onChange={() => setUpdateMode('name')} 
                      />
                      <div className="option-content">
                        <div className="option-icon">📝</div>
                        <div className="option-details">
                          <span className="option-title">Update Name Only</span>
                          <span className="option-desc">Prefix will be auto-generated</span>
                        </div>
                      </div>
                    </label>
                    
                    <label className={`update-mode-option ${updateMode === 'prefix' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="updateMode" 
                        value="prefix" 
                        checked={updateMode === 'prefix'} 
                        onChange={() => setUpdateMode('prefix')} 
                      />
                      <div className="option-content">
                        <div className="option-icon">🏷️</div>
                        <div className="option-details">
                          <span className="option-title">Update Prefix Only</span>
                          <span className="option-desc">Name will stay the same</span>
                        </div>
                      </div>
                    </label>
                    
                    <label className={`update-mode-option ${updateMode === 'both' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="updateMode" 
                        value="both" 
                        checked={updateMode === 'both'} 
                        onChange={() => setUpdateMode('both')} 
                      />
                      <div className="option-content">
                        <div className="option-icon">✏️</div>
                        <div className="option-details">
                          <span className="option-title">Update Both</span>
                          <span className="option-desc">Change name and prefix</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}
              
              {/* Form fields */}
              <div className={`admin-form-group ${modalMode === 'edit' && updateMode === 'prefix' ? 'disabled' : ''}`}>
                <label htmlFor="cateName" className="admin-form-label">
                  Category Name:
                  {modalMode === 'edit' && updateMode === 'prefix' && (
                    <span className="field-hint"> (Name will not be updated)</span>
                  )}
                </label>
                <input
                  type="text"
                  id="cateName"
                  name="cateName"
                  className={`admin-form-input ${fieldErrors.cateName ? 'input-error' : ''}`}
                  value={updateMode === 'prefix' && modalMode === 'edit' ? '' : currentCategory.cateName}
                  onChange={handleInputChange}
                  required={modalMode === 'add' || (modalMode === 'edit' && (updateMode === 'name' || updateMode === 'both'))}
                  placeholder={modalMode === 'add' ? "Enter category name" : updateMode === 'prefix' ? "(Name will remain unchanged)" : "Enter new name"}
                  disabled={modalMode === 'edit' && updateMode === 'prefix'}
                />
                <small className="field-description">
                  {modalMode === 'add' 
                    ? "The prefix will be auto-generated from the category name" 
                    : updateMode === 'name' 
                      ? "The prefix will be automatically regenerated from the new name"
                      : updateMode === 'prefix'
                        ? "The name will remain unchanged"
                        : "Both name and prefix will be updated"}
                </small>
              </div>
              
              <div className={`admin-form-group ${modalMode === 'edit' && updateMode === 'name' ? 'disabled' : ''}`}>
                <label htmlFor="prefix" className="admin-form-label">
                  Prefix:
                  {modalMode === 'edit' && updateMode === 'name' && (
                    <span className="field-hint"> (Prefix will be auto-generated)</span>
                  )}
                </label>
                <input
                  type="text"
                  id="prefix"
                  name="prefix"
                  className={`admin-form-input ${fieldErrors.prefix ? 'input-error' : ''}`}
                  value={updateMode === 'name' && modalMode === 'edit' ? '' : currentCategory.prefix}
                  onChange={handleInputChange}
                  required={modalMode === 'edit' && (updateMode === 'prefix' || updateMode === 'both')}
                  placeholder={
                    modalMode === 'add' 
                      ? autoPrefix ? `Auto-generated: "${autoPrefix}"` : "Auto-generated (optional)"
                      : updateMode === 'name' 
                        ? "Will be auto-generated"
                        : "Enter new prefix"
                  }
                  disabled={modalMode === 'edit' && updateMode === 'name'}
                />
                <small className="field-description">
                  {modalMode === 'add' 
                    ? autoPrefix 
                      ? `Preview of auto-generated prefix: "${autoPrefix}"` 
                      : "Prefix will be auto-generated from the category name" 
                    : updateMode === 'name'
                      ? "The prefix will be automatically generated from the new name"
                      : updateMode === 'prefix'
                        ? "Only the prefix will be updated, name remains the same"
                        : "Custom prefix for this category"}
                </small>
              </div>
              
              {/* Preview panel for edit mode */}
              {modalMode === 'edit' && (
                <div className="preview-panel">
                  <h4>Update Preview</h4>
                  
                  {(() => {
                    const original = getOriginalCategory();
                    if (!original) return null;
                    
                    // Determine what the final values will be based on update mode
                    let finalName = '';
                    let finalPrefix = '';
                    
                    switch (updateMode) {
                      case 'name':
                        finalName = currentCategory.cateName;
                        finalPrefix = autoPrefix || "(auto-generated)";
                        break;
                      case 'prefix':
                        finalName = original.cateName;
                        finalPrefix = currentCategory.prefix;
                        break;
                      case 'both':
                        finalName = currentCategory.cateName;
                        finalPrefix = currentCategory.prefix;
                        break;
                    }
                    
                    return (
                      <div className="preview-content">
                        <div className="preview-row">
                          <span className="preview-label">Current:</span>
                          <span className="preview-value">
                            {original.cateName} ({original.prefix})
                          </span>
                        </div>
                        <div className="preview-row">
                          <span className="preview-label">After Update:</span>
                          <span className="preview-value changed">
                            {finalName} ({finalPrefix})
                          </span>
                        </div>
                        <div className="preview-note">
                          {updateMode === 'name' && (
                            <span className="auto-note">* Prefix will be automatically generated from the new name</span>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
              
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-button secondary" onClick={closeModal} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-button" disabled={loading || successMessage !== ''}>
                  {loading ? (
                    <span>Processing...</span>
                  ) : successMessage ? (
                    <span>✓ Success</span>
                  ) : (
                    modalMode === 'add' ? 'Add Category' : 'Save Changes'
                  )}
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