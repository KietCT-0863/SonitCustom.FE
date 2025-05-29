import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContext';
import api from '../../../config/api.config';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login', { state: { from: '/account/profile' } });
      return;
    }

    // Fetch detailed user profile information
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const data = await api.get('/User/me');
        setProfileData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
        setError('Không thể tải thông tin người dùng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner-container">
          <div className="logo-spinner">
            <img src="/assets/images/logo.jpg" alt="Loading" className="spinning-logo" />
          </div>
          <p>Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Thử lại</button>
        </div>
      </div>
    );
  }

  // Get user avatar placeholder
  const getUserAvatar = () => {
    if (!profileData) return null;
    
    // Check if user has an avatar property
    if (profileData.avatar) {
      return <img src={profileData.avatar} alt={profileData.username} className="profile-avatar" />;
    }
    
    // If no avatar, use first letter of username
    return (
      <div className="avatar-placeholder profile-large">
        {profileData.username.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Thông tin tài khoản</h1>
      </div>
      
      <div className="profile-content">
        <div className="profile-sidebar">
          {getUserAvatar()}
          <h2>{profileData?.fullname || profileData?.username}</h2>
          <p className="user-role">{profileData?.roleName === 'admin' ? 'Quản trị viên' : 'Thành viên'}</p>
          
          <div className="profile-nav">
            <button 
              className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`} 
              onClick={() => setActiveTab('info')}
            >
              <i className="fas fa-user"></i> Thông tin cá nhân
            </button>
            <button 
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} 
              onClick={() => setActiveTab('orders')}
            >
              <i className="fas fa-shopping-cart"></i> Đơn hàng của tôi
            </button>
            <button 
              className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`} 
              onClick={() => setActiveTab('security')}
            >
              <i className="fas fa-lock"></i> Bảo mật
            </button>
          </div>
        </div>
        
        <div className="profile-details">
          {activeTab === 'info' && (
            <div className="info-tab">
              <h3>Thông tin cá nhân</h3>
              
              <div className="info-group">
                <div className="info-item">
                  <span className="info-label">Họ tên:</span>
                  <span className="info-value">{profileData?.fullname || 'Chưa cập nhật'}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Tên đăng nhập:</span>
                  <span className="info-value">{profileData?.username}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{profileData?.email || 'Chưa cập nhật'}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Số điện thoại:</span>
                  <span className="info-value">{profileData?.phone || 'Chưa cập nhật'}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Địa chỉ:</span>
                  <span className="info-value">{profileData?.address || 'Chưa cập nhật'}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Ngày tham gia:</span>
                  <span className="info-value">{profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString('vi-VN') : 'Không có thông tin'}</span>
                </div>
              </div>
              
              <button className="edit-profile-btn">
                <i className="fas fa-edit"></i> Chỉnh sửa thông tin
              </button>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="orders-tab">
              <h3>Đơn hàng của tôi</h3>
              <p>Bạn có thể xem chi tiết các đơn hàng đã đặt tại đây.</p>
              <div className="order-links">
                <a href="/account/orders/manage" className="order-link">
                  <i className="fas fa-clipboard-list"></i>
                  <span>Quản lý đơn hàng</span>
                </a>
                <a href="/account/orders/history" className="order-link">
                  <i className="fas fa-history"></i>
                  <span>Lịch sử đơn hàng</span>
                </a>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="security-tab">
              <h3>Bảo mật tài khoản</h3>
              
              <div className="security-option">
                <div className="security-info">
                  <h4>Đổi mật khẩu</h4>
                  <p>Cập nhật mật khẩu mới để bảo vệ tài khoản của bạn.</p>
                </div>
                <button className="change-password-btn">
                  <i className="fas fa-key"></i> Đổi mật khẩu
                </button>
              </div>
              
              <div className="security-option">
                <div className="security-info">
                  <h4>Xoá tài khoản</h4>
                  <p>Xoá tài khoản và tất cả dữ liệu liên quan.</p>
                </div>
                <button className="delete-account-btn">
                  <i className="fas fa-trash-alt"></i> Xoá tài khoản
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 