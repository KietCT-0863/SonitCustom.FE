import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop';
import './styles.css';
import { ProductsGrid } from '../../components/ProductsPage/ProductsGrid';
import { SearchBar } from '../../components/ProductsPage/SearchBar';
import { Pagination } from '../../components/ProductsPage/Pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';








const StorePage = () => {
  const navigate = useNavigate();
  
  // State for products and categories
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and Sort state
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Fetch product data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/Product');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/Category');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Toggle mobile filter visibility
  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };
  
  // Handle category change
  const handleCategoryChange = (categoryName) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
    setCurrentPage(1);
  };
  
  // Handle price filter change
  const handlePriceFilterChange = (filter) => {
    setPriceFilter(filter);
    setCurrentPage(1);
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setActiveCategory(null);
    setSearchTerm('');
    setPriceFilter('all');
    setSortOption('newest');
    setCurrentPage(1);
  };
  
  // Search handling
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  

  // Product click handling
  const handleProductClick = (productId) => {
    navigate(`/store/product/${productId}`);
  };
  
  // Pagination handling
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Apply all filters to products
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (activeCategory && product.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && 
        !product.proName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !product.prodId.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by price
    console.log('Product before price filter:', {
      name: product.proName,
      price: product.price,
      priceFilter: priceFilter,
      isFree: product.price === 0,
      isPaid: product.price > 0
    });

    if (priceFilter === 'free') {
      // Giữ lại chỉ những sản phẩm có giá bằng 0
      if (product.price !== 0) {
        console.log('Filtered out (free):', product.proName, 'price:', product.price);
        return false;
      }
    } else if (priceFilter === 'paid') {
      // Giữ lại chỉ những sản phẩm có giá lớn hơn 0
      if (product.price === null || product.price <= 0) { // Loại bỏ null và 0
        console.log('Filtered out (paid):', product.proName, 'price:', product.price);
        return false;
      }
    }
    // Nếu priceFilter là 'all', hoặc sản phẩm không bị loại bởi filter free/paid, giữ lại.
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // Default sort by newest if sortOption is 'newest' or not price-related
    if (sortOption === 'newest') {
      // Assuming products have a creation/update timestamp or id that implies recency
      // For now, return 0 to maintain original order if no specific sort is applied
      return 0; 
    }

    // Handle null prices first for price sorting
    if (a.price === null && b.price !== null) {
        return sortOption === 'price-asc' ? -1 : 1; // null first for asc, last for desc
    }
    if (a.price !== null && b.price === null) {
        return sortOption === 'price-asc' ? 1 : -1; // null last for asc, first for desc
    }
    if (a.price === null && b.price === null) {
        return 0; // Both null, maintain relative order
    }

    // Now compare non-null prices (0 or > 0)
    if (sortOption === 'price-asc') {
      // Sort non-null prices: 0 comes before > 0, then sort numerically
      if (a.price === 0 && b.price > 0) return -1; // 0 comes before positive
      if (a.price > 0 && b.price === 0) return 1;  // positive comes after 0
      
      // Both are 0 or both are positive - sort numerically
      return a.price - b.price;

    } else if (sortOption === 'price-desc') {
      // Sort non-null prices: > 0 comes before 0, then sort numerically
      if (a.price > 0 && b.price === 0) return -1; // positive comes before 0
      if (a.price === 0 && b.price > 0) return 1;  // 0 comes after positive
      
      // Both are 0 or both are positive - sort numerically (descending)
      return b.price - a.price;
    }

    // Should not reach here if sortOption is handled above, but as a fallback
    return 0; 
  });
  
  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  return (
    <div className="store-page">
      <ScrollToTop />
      
      <div className="store-header">
        <h1 className="store-title">Sản phẩm của chúng tôi</h1>
        <p className="store-description">Khám phá các sản phẩm chất lượng cao từ Sonit Custom</p>
      </div>
      
      <div className="store-filters-and-products">
        {/* Mobile filter toggle */}
        <div className="mobile-filter-toggle" onClick={toggleMobileFilter}>
          <span>Bộ lọc</span>
          <FontAwesomeIcon icon={faFilter} className={showMobileFilter ? 'active' : ''} />
        </div>
        
        {/* Filters */}
        <div className={`store-filters ${showMobileFilter ? 'mobile-show' : ''}`}>
          <div className="filter-section filter-header">
            <h3 className="filter-title">Bộ lọc</h3>
            <button className="close-filter-btn" onClick={toggleMobileFilter}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="filter-section">
            <h3 className="filter-title">Tìm kiếm</h3>
            <div className="search-container">
              <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
            </div>
          </div>
          
          <div className="filter-section">
            <h3 className="filter-title">Danh mục sản phẩm</h3>
            <ul className="category-list">
              <li 
                className={activeCategory === null ? 'active' : ''} 
                onClick={() => handleCategoryChange(null)}
              >
                Tất cả
              </li>
              {categories.map(category => (
                <li 
                  key={category.cateId} 
                  className={activeCategory === category.cateName ? 'active' : ''} 
                  onClick={() => handleCategoryChange(category.cateName)}
                >
                  {category.cateName}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="filter-section">
            <h3 className="filter-title">Giá sản phẩm</h3>
            <ul className="price-list">
              <li 
                className={priceFilter === 'all' ? 'active' : ''} 
                onClick={() => handlePriceFilterChange('all')}
              >
                Tất cả
              </li>
              <li 
                className={priceFilter === 'free' ? 'active' : ''} 
                onClick={() => handlePriceFilterChange('free')}
              >
                Miễn phí
              </li>
              <li 
                className={priceFilter === 'paid' ? 'active' : ''} 
                onClick={() => handlePriceFilterChange('paid')}
              >
                Có phí
              </li>
            </ul>
          </div>
          
          <div className="filter-section">
            <h3 className="filter-title">Sắp xếp</h3>
            <ul className="sort-list">
              <li 
                className={sortOption === 'newest' ? 'active' : ''} 
                onClick={() => setSortOption('newest')}
              >
                Mới nhất
              </li>
              <li 
                className={sortOption === 'price-asc' ? 'active' : ''} 
                onClick={() => setSortOption('price-asc')}
              >
                Giá: Thấp đến cao
              </li>
              <li 
                className={sortOption === 'price-desc' ? 'active' : ''} 
                onClick={() => setSortOption('price-desc')}
              >
                Giá: Cao đến thấp
              </li>
            </ul>
          </div>
          
          <button className="clear-filters-btn" onClick={clearAllFilters}>
            Xóa bộ lọc
          </button>
        </div>
        
        {/* Products */}
        <div className="store-products">
          {loading ? (
            <LoadingSpinner message="Đang tải sản phẩm..." />
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Thử lại</button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products-message">
              <p>Không tìm thấy sản phẩm phù hợp với bộ lọc của bạn.</p>
              <button onClick={clearAllFilters}>Xóa bộ lọc</button>
            </div>
          ) : (
            <>
              <div className="product-count">
                Hiển thị {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, filteredProducts.length)} / {filteredProducts.length} sản phẩm
              </div>
              
              {console.log('Rendering ProductsGrid with:', currentProducts)}
              <ProductsGrid 
                products={currentProducts} 
                onProductClick={handleProductClick} 
              />
              
              <Pagination 
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage; 