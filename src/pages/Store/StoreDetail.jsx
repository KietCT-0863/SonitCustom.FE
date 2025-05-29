import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';
import './styles.css';

const StoreDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data from API
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        // Fetch the specific product
        const productResponse = await axios.get('/api/Product');
        const productData = productResponse.data;
        
        // Find the product with matching ID
        const foundProduct = productData.find(item => item.prodId === productId);
        
        if (!foundProduct) {
          setError('Không tìm thấy sản phẩm');
          setLoading(false);
          return;
        }
        
        setProduct(foundProduct);
        
        // Find related products (same category)
        const related = productData
          .filter(item => 
            item.category === foundProduct.category && 
            item.prodId !== foundProduct.prodId
          )
          .slice(0, 4); // Get up to 4 related products
          
        setRelatedProducts(related);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm');
        setLoading(false);
        console.error('Error fetching product:', err);
      }
    };
    
    fetchProductData();
  }, [productId]);

  const handleBackToStore = () => {
    navigate('/store');
  };
  
  if (loading) {
    return (
      <div className="store-detail-page">
        <ScrollToTop />
        <div className="loading-container">
          <LoadingSpinner message="Đang tải thông tin sản phẩm..." />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="store-detail-page">
        <ScrollToTop />
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="back-button" onClick={handleBackToStore}>
            Quay lại danh sách sản phẩm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="store-detail-page">
      <ScrollToTop />
      
      <div className="back-navigation">
        <button className="back-button" onClick={handleBackToStore}>
          &larr; Quay lại danh sách sản phẩm
        </button>
      </div>
      
      <div className="product-detail-container">
        <div className="product-detail-left">
          <div className="product-detail-image">
            <img 
              src={product.imgUrl || '/assets/products/default.jpg'} 
              alt={product.proName} 
              className="main-product-image" 
            />
          </div>
        </div>
        
        <div className="product-detail-right">
          <div className="product-detail-info">
            <div className="product-detail-header">
              <h1 className="product-detail-title">{product.proName}</h1>
              <div className="product-detail-id">Mã sản phẩm: {product.prodId}</div>
            </div>
            
            <div className="product-detail-category">
              Danh mục: {product.category}
            </div>
            
            <div className="product-detail-description">
              <h3>Mô tả:</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-detail-price-container">
              {product.isCustom || product.price === 0 ? (
                <div className="product-detail-contact">
                  <div className="contact-price">Liên hệ</div>
                  <p className="contact-note">Vui lòng liên hệ để được báo giá</p>
                </div>
              ) : (
                <div className="product-detail-price">
                  <div className="price-amount">{product.price.toLocaleString('vi-VN')} ₫</div>
                </div>
              )}
            </div>
            
            <div className="product-detail-custom">
              <div className="custom-badge">
                {product.isCustom ? 'Có thể tùy chỉnh' : 'Không tùy chỉnh'}
              </div>
            </div>
            
            <div className="product-detail-actions">
              {!product.isCustom && product.price > 0 && (
                <button className="add-to-cart-button">
                  Thêm vào giỏ hàng
                </button>
              )}
              
              <button className="contact-button">
                Liên hệ ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2 className="related-products-title">Sản phẩm tương tự</h2>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div 
                key={relatedProduct.prodId}
                className="related-product-card"
                onClick={() => navigate(`/store/product/${relatedProduct.prodId}`)}
              >
                <div className="related-product-image">
                  <img 
                    src={relatedProduct.imgUrl || '/assets/products/default.jpg'} 
                    alt={relatedProduct.proName} 
                  />
                </div>
                <div className="related-product-info">
                  <h3 className="related-product-name">{relatedProduct.proName}</h3>
                  {relatedProduct.isCustom || relatedProduct.price === 0 ? (
                    <div className="related-product-contact">Liên hệ</div>
                  ) : (
                    <div className="related-product-price">
                      {relatedProduct.price.toLocaleString('vi-VN')} ₫
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDetail; 