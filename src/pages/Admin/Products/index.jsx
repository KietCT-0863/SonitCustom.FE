import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import ProductService from '../../../services/product.service';
import { useUser } from '../../../contexts/UserContext';

const Products = () => {
  const { isAdmin } = useUser();
  const navigate = useNavigate();
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
    price: 0,
    category: 1, // Default to first category
    isCustom: false,
    productImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, id: null });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [actionLoading, setActionLoading] = useState(false); // Loading state for actions like create, update, delete

  // Check admin access and authenticate
  useEffect(() => {
    const checkAuth = async () => {
      // Verify admin status on component load
      if (!isAdmin || typeof isAdmin !== 'function' || !isAdmin()) {
        navigate('/login?redirect=' + encodeURIComponent('/admin/products'));
        return;
      }
      
      try {
        setLoading(true);
        // Verify authentication status
        const isAuthenticated = await ProductService.checkAuthStatus();
        
        if (!isAuthenticated) {
          console.log("Xác thực thất bại, đang chuyển hướng đến trang đăng nhập");
          navigate('/login?redirect=' + encodeURIComponent('/admin/products'));
          return;
        }
        
        // Load initial data
        await loadData();
      } catch (error) {
        console.error('Auth check failed:', error);
        setErrorMessage('Không thể xác minh trạng thái đăng nhập. Vui lòng tải lại trang.');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [isAdmin, navigate]);
  
  // Function to load both products and categories
  const loadData = async () => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      console.log("Đang tải dữ liệu...");
      // Load categories first
      const categoriesResponse = await ProductService.getCategories();
      setCategories(categoriesResponse);
      
      // Then load products
      const productsResponse = await ProductService.getProducts();
      setProductList(productsResponse);
      
      console.log("Tải dữ liệu thành công:", {
        categories: categoriesResponse.length,
        products: productsResponse.length
      });
    } catch (error) {
      console.error('Error loading data:', error);
      
      // Handle authentication errors
      if (error?.message?.includes('đăng nhập')) {
        console.log("Session hết hạn, đang chuyển hướng đến trang đăng nhập");
        navigate('/login?redirect=' + encodeURIComponent('/admin/products'));
        return;
      }
      
      setErrorMessage(error?.message || 'Không thể tải dữ liệu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Filter is applied in filteredProducts computation
  };

  // Filter products based on search term and category
  const filteredProducts = productList?.filter(product => {
    // Search by name or description
    const matchesSearch = 
      searchTerm === '' || 
      product.proName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = 
      filters.category === '' || 
      product.category?.toLowerCase() === filters.category.toLowerCase();
    
    return matchesSearch && matchesCategory;
  }) || [];
  
  // Form handling
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    // Xử lý upload file hình ảnh
    if (name === 'productImage' && files && files.length > 0) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        productImage: file
      }));
      
      // Tạo preview cho hình ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      return;
    }
    
    // Xử lý trường giá tiền
    if (name === 'price') {
      const numValue = parseFloat(value);
      // Cho phép chuỗi rỗng (sẽ được chuyển đổi thành 0 sau) hoặc số hợp lệ
      if (value === '' || (!isNaN(numValue) && isFinite(numValue))) {
        setFormData(prev => ({
          ...prev,
          [name]: value === '' ? 0 : numValue
        }));
      }
      return;
    }
    
    // Xử lý các trường khác
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.proName?.trim()) {
      errors.proName = 'Tên sản phẩm không được để trống';
    } else if (formData.proName.length < 3 || formData.proName.length > 100) {
      errors.proName = 'Tên sản phẩm phải có từ 3 đến 100 ký tự';
    }
    
    if (!formData.description?.trim()) {
      errors.description = 'Mô tả không được để trống';
    }
    
    if (!isEditing && !formData.productImage) {
      errors.productImage = 'Vui lòng chọn hình ảnh sản phẩm';
    }
    
    if (formData.price < 0) {
      errors.price = 'Giá không được âm';
    }
    
    if (!formData.category) {
      errors.category = 'Danh mục không được để trống';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setActionLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      if (isEditing && currentProduct) {
        // UPDATE PRODUCT
        // Chỉ bao gồm các trường thực sự thay đổi
        const updateData = {};
        
        // So sánh với sản phẩm hiện tại và chỉ bao gồm các trường đã thay đổi
        if (formData.proName !== currentProduct.proName) {
          updateData.proName = formData.proName;
        }
        
        if (formData.description !== currentProduct.description) {
          updateData.description = formData.description;
        }
        
        // Thêm hình ảnh mới nếu có
        if (formData.productImage) {
          updateData.productImage = formData.productImage;
        }
        
        // Xử lý giá riêng biệt (có thể là 0)
        if (formData.price !== currentProduct.price) {
          updateData.price = formData.price;
        }
        
        // Đối với danh mục, kiểm tra xem tên danh mục đã thay đổi chưa
        const currentCategoryId = getCategoryIdByName(currentProduct.category);
        if (parseInt(formData.category) !== currentCategoryId) {
          updateData.category = parseInt(formData.category);
        }
        
        if (formData.isCustom !== currentProduct.isCustom) {
          updateData.isCustom = formData.isCustom;
        }
        
        // Kiểm tra nếu có thay đổi thực sự
        if (Object.keys(updateData).length === 0 && !formData.productImage) {
          setErrorMessage('Không phát hiện thay đổi nào');
          setActionLoading(false);
          return;
        }
        
        console.log(`Đang cập nhật sản phẩm ID: ${currentProduct.prodId}`, updateData);
        
        try {
          const result = await ProductService.updateProduct(currentProduct.prodId, updateData);
          console.log('Kết quả cập nhật sản phẩm:', result);
          setSuccessMessage(result.message || 'Cập nhật sản phẩm thành công');
          setShowModal(false);
          await loadData(); // Tải lại dữ liệu sau khi cập nhật
        } catch (error) {
          console.error('Lỗi cập nhật sản phẩm:', error);
          
          // Kiểm tra lỗi xác thực
          if (error?.message?.includes('đăng nhập')) {
            setErrorMessage('Phiên đăng nhập hết hạn, đang chuyển hướng...');
            setTimeout(() => {
              navigate('/login?redirect=' + encodeURIComponent('/admin/products'));
            }, 1000);
            return;
          }
          
          // Hiển thị thông báo lỗi chi tiết từ server
          setErrorMessage(
            typeof error === 'object' && error !== null && error.message 
              ? error.message 
              : (typeof error === 'string' ? error : 'Có lỗi khi cập nhật sản phẩm')
          );
        }
      } else {
        // CREATE PRODUCT
        // Đảm bảo các trường có giá trị hợp lệ
        const createData = {
          proName: formData.proName.trim(),
          description: formData.description.trim(),
          productImage: formData.productImage,
          price: parseFloat(formData.price), // Chuyển thành số
          category: parseInt(formData.category),
          isCustom: formData.isCustom
        };
        
        console.log('Đang tạo sản phẩm mới:', createData);
        
        try {
          const result = await ProductService.createProduct(createData);
          console.log('Kết quả tạo sản phẩm:', result);
          setSuccessMessage(result.message || 'Thêm sản phẩm thành công');
          setShowModal(false);
          await loadData(); // Tải lại dữ liệu sau khi tạo
        } catch (error) {
          console.error('Lỗi tạo sản phẩm:', error);
          
          // Kiểm tra lỗi xác thực
          if (error?.message?.includes('đăng nhập')) {
            setErrorMessage('Phiên đăng nhập hết hạn, đang chuyển hướng...');
            setTimeout(() => {
              navigate('/login?redirect=' + encodeURIComponent('/admin/products'));
            }, 1000);
            return;
          }
          
          // Hiển thị thông báo lỗi chi tiết từ server
          setErrorMessage(
            typeof error === 'object' && error !== null && error.message 
              ? error.message 
              : (typeof error === 'string' ? error : 'Có lỗi khi thêm sản phẩm mới')
          );
        }
      }
    } catch (error) {
      console.error('Lỗi gửi form:', error);
      setErrorMessage('Có lỗi xảy ra. Vui lòng đảm bảo bạn đã đăng nhập với quyền admin.');
    } finally {
      setActionLoading(false);
    }
  };
  
  const handleDelete = async (productId) => {
    setActionLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      console.log(`Đang xóa sản phẩm ID: ${productId}`);
      const result = await ProductService.deleteProduct(productId);
      setSuccessMessage(result.message || 'Đã xóa sản phẩm thành công');
      setDeleteConfirmation({ show: false, id: null });
      await loadData(); // Reload data after delete
    } catch (error) {
      console.error('Error deleting product:', error);
      
      // Check for auth error
      if (error?.message?.includes('đăng nhập')) {
        setErrorMessage('Phiên đăng nhập hết hạn, đang chuyển hướng...');
        setDeleteConfirmation({ show: false, id: null });
        setTimeout(() => {
          navigate('/login?redirect=' + encodeURIComponent('/admin/products'));
        }, 1000);
        return;
      }
      
      setErrorMessage(error?.message || 'Có lỗi khi xóa sản phẩm');
    } finally {
      setActionLoading(false);
    }
  };
  
  // Add new product
  const handleAddNewClick = () => {
    // Initialize with default values
    setFormData({
      proName: '',
      description: '',
      price: 0,
      category: categories.length > 0 ? categories[0].cateId : 1,
      isCustom: false,
      productImage: null
    });
    
    setImagePreview(null);
    setFormErrors({});
    setIsEditing(false);
    setCurrentProduct(null);
    setErrorMessage('');
    setSuccessMessage('');
    setShowModal(true);
  };
  
  // Edit existing product
  const handleEditClick = (product) => {
    // Find the category ID based on the category name from the product
    const categoryId = getCategoryIdByName(product.category);
    
    setFormData({
      proName: product.proName,
      description: product.description,
      price: product.price,
      category: categoryId,
      isCustom: product.isCustom,
      productImage: null // Không yêu cầu hình ảnh khi chỉnh sửa
    });
    
    setImagePreview(product.imgUrl); // Sử dụng URL hiện tại làm preview
    setFormErrors({});
    setIsEditing(true);
    setCurrentProduct(product);
    setErrorMessage('');
    setSuccessMessage('');
    setShowModal(true);
  };
  
  // Get category name from category ID
  const getCategoryName = (categoryId) => {
    if (!categories) return '';
    const category = categories.find(cat => cat.cateId === parseInt(categoryId));
    return category ? category.cateName : '';
  };
  
  // Get category ID from category name
  const getCategoryIdByName = (categoryName) => {
    if (!categories || !categoryName) return 1; // Default to first category
    
    const category = categories.find(cat => 
      cat.cateName?.toLowerCase() === categoryName.toLowerCase()
    );
    
    return category ? category.cateId : 1;
  };

  // Retry data loading
  const handleRetryDataLoading = () => {
    loadData();
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await ProductService.logout();
      navigate('/login');
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      // Still redirect even if logout API fails
      navigate('/login');
    }
  };

  // Loading skeleton
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

  // Main component render
  return (
    <div className="products-container">
      {/* Header with button */}
      <div className="admin-card">
        <div className="section-header">
          <div>
            <h2>Quản lý sản phẩm</h2>
            <p className="section-subtitle">Quản lý danh sách sản phẩm của cửa hàng</p>
          </div>
          <div className="header-actions">
            <button 
              className="admin-btn admin-btn-primary"
              onClick={handleAddNewClick}
              disabled={actionLoading}
            >
              {actionLoading ? 'Đang xử lý...' : 'Thêm sản phẩm mới'}
            </button>
            <button 
              className="admin-btn admin-btn-secondary"
              onClick={handleRetryDataLoading}
              disabled={actionLoading || loading}
              style={{ marginLeft: '10px' }}
            >
              Tải lại dữ liệu
            </button>
            <button 
              className="admin-btn admin-btn-secondary"
              onClick={handleSignOut}
              disabled={actionLoading}
              style={{ marginLeft: '10px' }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
      
      {/* Error message display */}
      {errorMessage && (
        <div className="admin-alert admin-alert-error">
          <span>❌</span>
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage('')}>×</button>
        </div>
      )}
      
      {/* Success message display */}
      {successMessage && (
        <div className="admin-alert admin-alert-success">
          <span>✅</span>
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage('')}>×</button>
        </div>
      )}
      
      {/* Filters and search */}
      <div className="admin-card">
        <div className="filters-container">
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <span>🔍</span>
              </button>
            </form>
          </div>
          
          <div className="filter-selects">
            <div className="filter-select">
              <label>Danh mục:</label>
              <select 
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">Tất cả danh mục</option>
                {categories?.map(category => (
                  <option key={category.cateId} value={category.cateName}>
                    {category.cateName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product table */}
      <div className="admin-recent-section">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã SP</th>
                <th>Tên sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Giá (₫)</th>
                <th>Danh mục</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.prodId}>
                    <td>{product.prodId}</td>
                    <td>{product.proName}</td>
                    <td>
                      <img 
                        src={product.imgUrl} 
                        alt={product.proName}
                        className="product-thumbnail"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                    </td>
                    <td>{product.price.toLocaleString('vi-VN')}</td>
                    <td>{product.category}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn edit"
                          onClick={() => handleEditClick(product)}
                          disabled={actionLoading}
                        >
                          <span>✏️</span>
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => setDeleteConfirmation({ show: true, id: product.prodId })}
                          disabled={actionLoading}
                        >
                          <span>🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Product modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h2>{isEditing ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
                disabled={actionLoading}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    name="proName"
                    value={formData.proName || ''}
                    onChange={handleInputChange}
                    required
                    disabled={actionLoading}
                  />
                  {formErrors.proName && <span className="error">{formErrors.proName}</span>}
                </div>
                
                <div className="form-group">
                  <label>Mô tả</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    disabled={actionLoading}
                  ></textarea>
                  {formErrors.description && <span className="error">{formErrors.description}</span>}
                </div>
                
                <div className="form-group">
                  <label>Hình ảnh</label>
                  <input
                    type="file"
                    name="productImage"
                    onChange={handleInputChange}
                    accept="image/*"
                    required
                    disabled={actionLoading}
                  />
                  {formErrors.productImage && <span className="error">{formErrors.productImage}</span>}
                  {imagePreview && (
                    <div className="img-preview">
                      <img 
                        src={imagePreview} 
                        alt="Product Preview"
                      />
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Giá (₫)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="1"
                    required
                    disabled={actionLoading}
                  />
                  {formErrors.price && <span className="error">{formErrors.price}</span>}
                </div>
                
                <div className="form-group">
                  <label>Danh mục</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    disabled={actionLoading}
                  >
                    {categories?.map(category => (
                      <option key={category.cateId} value={category.cateId}>
                        {category.cateName}
                      </option>
                    ))}
                  </select>
                  {formErrors.category && <span className="error">{formErrors.category}</span>}
                </div>
                
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isCustom"
                      checked={formData.isCustom || false}
                      onChange={handleInputChange}
                      disabled={actionLoading}
                    />
                    Sản phẩm tùy chỉnh
                  </label>
                  <div className="help-text">
                    Đánh dấu sản phẩm này là có thể tùy chỉnh theo yêu cầu của khách hàng
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="admin-btn admin-btn-secondary"
                    onClick={() => setShowModal(false)}
                    disabled={actionLoading}
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit" 
                    className="admin-btn admin-btn-primary"
                    disabled={actionLoading}
                  >
                    {actionLoading ? 'Đang xử lý...' : (isEditing ? "Lưu thay đổi" : "Tạo sản phẩm")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete confirmation modal */}
      {deleteConfirmation.show && (
        <div className="modal-overlay">
          <div className="admin-modal delete-modal">
            <div className="modal-header">
              <h2>Xác nhận xóa</h2>
              <button 
                className="modal-close"
                onClick={() => setDeleteConfirmation({ show: false, id: null })}
                disabled={actionLoading}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-content">
              <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
              <p className="warning">Thao tác này không thể hoàn tác.</p>
              
              <div className="form-actions">
                <button 
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setDeleteConfirmation({ show: false, id: null })}
                  disabled={actionLoading}
                >
                  Hủy
                </button>
                <button 
                  className="admin-btn admin-btn-danger"
                  onClick={() => handleDelete(deleteConfirmation.id)}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Đang xử lý...' : 'Xóa'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products; 