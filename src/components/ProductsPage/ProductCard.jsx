import React, { useState } from 'react';
import './styles.css';

export const ProductCard = ({ product, onClick }) => {
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
  // Updated condition: show "Liên Hệ" only if price is 0
  const showContactInsteadOfPrice = product.price === 0;
  
  return (
    <div 
      className="new-product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="new-product-image-container">
        <img 
          src={product.imgUrl || product.image || '/assets/products/default.jpg'} 
          alt={product.proName || product.name} 
          className="new-product-image" 
        />
        
        {isHovered && (
          <div className="product-actions">
            <button className="show-details-btn" onClick={showDetailsClick}>
              Xem chi tiết
            </button>
          </div>
        )}
      </div>
      
      <div className="new-product-info">
        <div className="new-product-id">{product.prodId || product.id}</div>
        <h3 className="new-product-name">{product.proName || product.name}</h3>
      </div>
      
      <div className="new-product-details">
        {showContactInsteadOfPrice ? (
          <div className="new-product-contact">Liên Hệ</div>
        ) : (
          <div className="new-product-price">
            {(product.price || 0).toLocaleString('vi-VN')} ₫
          </div>
        )}
      </div>
    </div>
  );
}; 