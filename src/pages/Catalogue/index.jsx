import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop';
import ProductService from '../../services/product.service';
import './styles.css';

const CataloguePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const categoryRefs = useRef({});
  const navigate = useNavigate();
  
  // Tải dữ liệu sản phẩm từ API khi component được mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await ProductService.getProducts();
        
        // Lọc ra các danh mục duy nhất từ sản phẩm
        const uniqueCategories = [...new Set(productsData.map(product => product.category))];
        setCategories(uniqueCategories);
        
        // Thiết lập danh mục đầu tiên là active
        if (uniqueCategories.length > 0 && !activeCategory) {
          setActiveCategory(uniqueCategories[0]);
        }
        
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu sản phẩm:', err);
        setError('Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };
  
  const scrollToCategory = (category) => {
    setActiveCategory(category);
    if (categoryRefs.current[category]) {
      categoryRefs.current[category].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  // Nhóm sản phẩm theo danh mục
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
  
  if (loading) {
    return (
      <div className="catalogue-container">
        <div className="catalogue-header">
          <h1>CATALOGUE</h1>
          <p className="catalogue-subtitle">CATALOGUE FROM SONIT CUSTOM</p>
        </div>
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="catalogue-container">
        <div className="catalogue-header">
          <h1>CATALOGUE</h1>
          <p className="catalogue-subtitle">CATALOGUE FROM SONIT CUSTOM</p>
        </div>
        <div className="error-message">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="catalogue-container">
      <div className="catalogue-header">
        <h1>CATALOGUE</h1>
        <p className="catalogue-subtitle">CATALOGUE FROM SONIT CUSTOM</p>
      </div>
      
      <div className="catalogue-filter">
        <div className="filter-wrapper">
          <div className="years-navigation">
            {categories.map((category) => (
              <span 
                key={category} 
                className={`year-nav-item ${activeCategory === category ? 'active' : ''}`}
                onClick={() => scrollToCategory(category)}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="catalogue-grid-wrapper">
        {categories.map((category) => {
          const categoryProducts = productsByCategory[category] || [];
          
          if (categoryProducts.length === 0) return null;
          
          return (
            <div 
              className="year-section" 
              key={category} 
              ref={el => categoryRefs.current[category] = el}
              id={`category-${category}`}
            >
              <div className="year-header">
                <div className="year-marker">
                  <div className="year-marker-line"></div>
                  <div className="year-marker-dot"></div>
                </div>
                <h2 className="year-title">{category}</h2>
              </div>
              
              <div className="products-grid">
                {categoryProducts.map((product) => (
                  <div 
                    className="product-card" 
                    key={product.prodId}
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="product-image-wrapper">
                      <img src={product.imgUrl} alt={product.proName} className="product-image" />
                      <div className="product-overlay">
                        <span className="view-product">XEM CHI TIẾT</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedProduct && (
        <div className="product-modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-close" onClick={closeModal}>×</div>
            <div className="modal-image">
              <img src={selectedProduct.imgUrl} alt={selectedProduct.proName} />
            </div>
            <div className="modal-info">
              <h2>{selectedProduct.proName}</h2>
              <p className="modal-description">
                {selectedProduct.description || 'Sản phẩm độc đáo từ Sonit Custom, được chế tác thủ công với chất liệu cao cấp. Thiết kế đột phá với đường nét tinh tế, phù hợp cho người yêu thích phong cách mạnh mẽ.'}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <ScrollToTop />
    </div>
  );
};

export default CataloguePage; 