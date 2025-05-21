import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import './UserDropdown.css';

const UserDropdown = () => {
  const { user, logout, isAdmin } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Get user avatar placeholder
  const getUserAvatar = () => {
    if (!user) return null;
    
    // Check if user has an avatar property
    if (user.avatar) {
      return <img src={user.avatar} alt={user.username} className="user-avatar" />;
    }
    
    // If no avatar, use first letter of username
    return (
      <div className="avatar-placeholder">
        {user.username.charAt(0).toUpperCase()}
      </div>
    );
  };
  
  if (!user) return null;
  
  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      <button 
        className="user-dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getUserAvatar()}
        <span className="username">{user.fullname || user.username}</span>
      </button>
      
      {isOpen && (
        <div className="user-dropdown-menu">
          <div className="user-info">
            <div className="user-avatar-large">
              {getUserAvatar()}
            </div>
            <div className="user-details">
              <p className="username">{user.fullname || user.username}</p>
              <p className="email">{user.email}</p>
            </div>
          </div>
          
          <div className="dropdown-separator"></div>
          
          <ul className="dropdown-menu-items">
            <li>
              <Link to="/account/profile" className="dropdown-item">
                Thông tin người dùng
              </Link>
            </li>
            <li>
              <Link to="/account/orders/manage" className="dropdown-item">
                Quản lý đơn hàng
              </Link>
            </li>
            <li>
              <Link to="/account/orders/history" className="dropdown-item">
                Lịch sử đơn hàng
              </Link>
            </li>
            
            {/* Show admin link if user is admin */}
            {isAdmin() && (
              <li>
                <Link to="/admin" className="dropdown-item admin-item">
                  Admin Dashboard
                </Link>
              </li>
            )}
            
            <div className="dropdown-separator"></div>
            
            <li>
              <button onClick={handleLogout} className="dropdown-item logout-item">
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown; 