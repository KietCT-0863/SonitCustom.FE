import React, { useState, useEffect } from 'react';
import './styles.css';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho component ProductCard
const productCardTranslations = {
  en: {
    quickView: 'Quick view',
    addToCart: 'Add to cart',
    colorOption: 'Color option',
    alternatView: 'alternate view',
    new: 'NEW'
  },
  vi: {
    quickView: 'Xem nhanh',
    addToCart: 'Thêm vào giỏ',
    colorOption: 'Lựa chọn màu',
    alternatView: 'góc nhìn khác',
    new: 'MỚI'
  }
};

const ProductCard = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { registerTranslations } = useLanguage();
  
  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('productCard', productCardTranslations);
  }, [registerTranslations]);
  
  const getStatusClass = (status) => {
    if (!status) return '';
    
    switch(status.toLowerCase()) {
      case 'in stock':
      case 'còn hàng':
        return 'status-in-stock';
      case 'pre-order':
      case 'đặt trước':
        return 'status-pre-order';
      case 'limited edition':
      case 'phiên bản giới hạn':
        return 'status-limited';
      case 'out of stock':
      case 'hết hàng':
      case 'sold out':
        return 'status-sold-out';
      default:
        return '';
    }
  };
  
  const handleClick = () => {
    if (onClick) {
      onClick(product.path);
    }
  };
  
  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="product-image-container">
        <img 
          src={product.image || product.imageUrl} 
          alt={product.name} 
          className="product-image" 
        />
        {product.secondaryImageUrl && (
          <img 
            src={product.secondaryImageUrl}
            alt={`${product.name} ${t('productCard.alternatView', 'alternate view')}`}
            className={`product-secondary-image ${isHovered ? 'show' : ''}`}
          />
        )}
        
        {isHovered && (
          <div className="quick-actions">
            <button className="quick-view-btn">{t('productCard.quickView', 'Quick view')}</button>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.category && (
          <div className="product-category">{product.category}</div>
        )}
        
        <div className="product-details">
          <div className="product-price">${product.price.toFixed(2)}</div>
          {product.status && (
            <div className={`product-status ${getStatusClass(product.status)}`}>
              {product.status}
            </div>
          )}
        </div>
        
        {product.colors && product.colors.length > 0 && (
          <div className="product-colors">
            {product.colors.map((color, index) => (
              <div 
                key={index} 
                className="product-color-dot" 
                style={{ backgroundColor: color }}
                title={`${t('productCard.colorOption', 'Color option')} ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {isHovered && (
        <div className="product-actions">
          <button className="add-to-cart-btn">{t('productCard.addToCart', 'Add to cart')}</button>
          <button className="wishlist-btn">♡</button>
        </div>
      )}
      
      {product.isNew && (
        <div className="product-badge new-badge">{t('productCard.new', 'NEW')}</div>
      )}
      
      {product.discount > 0 && (
        <div className="product-badge discount-badge">-{product.discount}%</div>
      )}
    </div>
  );
};

export { ProductCard }; 