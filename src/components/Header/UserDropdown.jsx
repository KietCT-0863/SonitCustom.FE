import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import './UserDropdown.css';

const UserDropdown = () => {
  const { user, logout, isAdmin } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // Check if user has admin role, handle both rolename (from backend) and roleName (frontend normalized)
  const userIsAdmin = () => {
    // Use the isAdmin helper from context, or check both role fields if needed
    if (typeof isAdmin === 'function') {
      return isAdmin();
    }
    const role = (user?.rolename || user?.roleName || '').toLowerCase();
    return role === 'admin';
  };
  
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

  // Navigate to admin dashboard
  const handleAdminDashboard = () => {
    navigate('/admin/dashboard');
    setIsOpen(false);
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
  
  // Get admin status
  const isUserAdmin = userIsAdmin();
  
  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      <button 
        className="user-dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getUserAvatar()}
        <span className="username">{user.fullname || user.username}</span>
        {isUserAdmin && <span className="admin-badge">Admin</span>}
      </button>
      
      {isOpen && (
        <div className="user-dropdown-menu">
          <div className="user-info">
            <div className="user-avatar-large">
              {getUserAvatar()}
            </div>
            <div className="user-details">
              <p className="username">{user.fullname || user.username}</p>
              <p className="email">{user.email || ''}</p>
              {isUserAdmin && <span className="role-badge admin">Admin</span>}
            </div>
          </div>
          
          <div className="dropdown-separator"></div>
          
          {/* Show admin dashboard prominently for admins */}
          {isUserAdmin && (
            <div className="admin-dashboard-link">
              <button onClick={handleAdminDashboard} className="admin-dashboard-button">
                <i className="fas fa-tachometer-alt"></i> Quản trị hệ thống
              </button>
            </div>
          )}
          
          {isUserAdmin && <div className="dropdown-separator"></div>}
          
          <ul className="dropdown-menu-items">
            <li>
              <Link to="/account/profile" className="dropdown-item">
                <i className="fas fa-user"></i> Thông tin người dùng
              </Link>
            </li>
            <li>
              <Link to="/account/orders/manage" className="dropdown-item">
                <i className="fas fa-clipboard-list"></i> Quản lý đơn hàng
              </Link>
            </li>
            <li>
              <Link to="/account/orders/history" className="dropdown-item">
                <i className="fas fa-history"></i> Lịch sử đơn hàng
              </Link>
            </li>
            
            {/* Admin features still listed in regular menu for convenience */}
            {isUserAdmin && (
              <li>
                <Link to="/admin/dashboard" className="dropdown-item admin-item">
                  <i className="fas fa-cogs"></i> Admin Dashboard
                </Link>
              </li>
            )}
            
            <div className="dropdown-separator"></div>
            
            <li>
              <button onClick={handleLogout} className="dropdown-item logout-item">
                <i className="fas fa-sign-out-alt"></i> Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown; 