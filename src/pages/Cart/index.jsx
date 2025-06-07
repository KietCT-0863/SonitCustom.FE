import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CartPage = () => {
  const { cartItems, getCartTotalItems, getCartTotalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleQuantityChange = (prodId, newQuantity) => {
    const parsedQuantity = parseInt(newQuantity, 10);
    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
      updateQuantity(prodId, parsedQuantity);
    }
  };

  const handleRemoveItem = (prodId) => {
    removeFromCart(prodId);
  };

  const handleCheckout = () => {
    if (user) {
      // Logic tiến hành thanh toán thực tế sẽ được thêm ở đây
      alert('Tiến hành thanh toán (chức năng đang phát triển)');
      // navigate('/checkout'); // Chuyển đến trang thanh toán chi tiết nếu có
    } else {
      localStorage.setItem('redirectAfterLogin', '/cart');
      navigate('/login');
    }
  };

  return (
    <div className="cart-page-container">
      <h1 className="cart-page-title">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Giỏ hàng trống.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.prodId} className="cart-item">
                <img src={item.imgUrl || '/assets/products/default.jpg'} alt={item.proName} className="cart-item-image" />
                <div className="cart-item-info">
                  <span className="cart-item-title">{item.proName}</span>
                  <span className="cart-item-price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</span>
                  <div className="cart-item-quantity-control">
                    <button onClick={() => handleQuantityChange(item.prodId, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => handleQuantityChange(item.prodId, e.target.value)} 
                      min="1" 
                      className="quantity-input"
                    />
                    <button onClick={() => handleQuantityChange(item.prodId, item.quantity + 1)} disabled={item.quantity >= 99}>+</button>
                  </div>
                </div>
                <button onClick={() => handleRemoveItem(item.prodId)} className="remove-item-btn">Xóa</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2 className="summary-title">Tóm tắt giỏ hàng</h2>
            <p className="summary-total-items">Tổng số sản phẩm: {getCartTotalItems()}</p>
            <p className="summary-total-price">Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getCartTotalPrice())}</p>
            <button onClick={handleCheckout} className="checkout-page-btn">
              Tiến hành thanh toán
            </button>
            <button onClick={clearCart} className="clear-cart-btn">Xóa toàn bộ giỏ hàng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 