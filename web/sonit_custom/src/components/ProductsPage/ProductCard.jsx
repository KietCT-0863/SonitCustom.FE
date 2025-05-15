import React, { useState } from 'react';
import './styles.css';

const ProductCard = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusClass = (status) => {
    if (!status) return '';
    
    switch(status.toLowerCase()) {
      case 'in stock':
        return 'status-in-stock';
      case 'pre-order':
        return 'status-pre-order';
      case 'limited edition':
        return 'status-limited';
      case 'out of stock':
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
            alt={`${product.name} alternate view`}
            className={`product-secondary-image ${isHovered ? 'show' : ''}`}
          />
        )}
        
        {isHovered && (
          <div className="quick-actions">
            <button className="quick-view-btn">Xem nhanh</button>
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
                title={`Color option ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {isHovered && (
        <div className="product-actions">
          <button className="add-to-cart-btn">Thêm vào giỏ</button>
          <button className="wishlist-btn">♡</button>
        </div>
      )}
      
      {product.isNew && (
        <div className="product-badge new-badge">NEW</div>
      )}
      
      {product.discount > 0 && (
        <div className="product-badge discount-badge">-{product.discount}%</div>
      )}
    </div>
  );
};

export { ProductCard }; 