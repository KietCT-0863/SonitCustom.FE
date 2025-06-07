import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

export const ProductCard = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
 
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
  
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ProductCard
    addToCart(product);
    console.log('Đã thêm vào giỏ hàng:', product.proName);
  };

  return (
    <div 
      className="new-product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <Link to={`/product/${product.prodId}`} className="new-product-link">
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
      </Link>
      
      <div className="new-product-details">
        {showContactInsteadOfPrice ? (
          <div className="new-product-contact">Liên Hệ</div>
        ) : (
          <div className="new-product-price">
            {(product.price || 0).toLocaleString('vi-VN')} ₫
          </div>
        )}
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}; 