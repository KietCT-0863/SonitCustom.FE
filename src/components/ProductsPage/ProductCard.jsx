import React, { useState } from 'react';
import './styles.css';

const ProductCard = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
 
  const handleClick = () => {
    if (onClick) {
      onClick(product.prodId || product.id);
    }
  };
  
  const showDetailsClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(product.prodId || product.id);
    }
  };

  // Check if the product should show "Liên Hệ" instead of price
  const showContactInsteadOfPrice = product.isCustom || product.price === 0;
  
  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="product-image-container">
        <img 
          src={product.imgUrl || product.image || '/assets/products/default.jpg'} 
          alt={product.proName || product.name} 
          className="product-image" 
        />
        
        {isHovered && (
          <div className="product-actions">
            <button className="show-details-btn" onClick={showDetailsClick}>
              Xem chi tiết
            </button>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-id">{product.prodId || product.id}</div>
        <h3 className="product-name">{product.proName || product.name}</h3>
        
        <div className="product-details">
          {showContactInsteadOfPrice ? (
            <div className="product-contact">Liên Hệ</div>
          ) : (
            <div className="product-price">
              {(product.price || 0).toLocaleString('vi-VN')} ₫
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProductCard }; 