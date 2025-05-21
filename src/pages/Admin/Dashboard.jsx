import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Simulated data - in a real app, these would come from API calls
const mockStats = {
  orders: 254,
  revenue: 12540000,
  newCustomers: 45,
  productsSold: 320,
  ordersTrend: '+12%',
  revenueTrend: '+8%',
  customersTrend: '-3%',
  productsTrend: '+5%',
};

const mockRecentOrders = [
  { id: '001', customer: 'Nguyễn Văn A', product: 'Cue ABC Maple', value: 2500000, status: 'Hoàn thành' },
  { id: '002', customer: 'Trần Thị B', product: 'Shaft XYZ Carbon', value: 1650000, status: 'Đang giao' },
  { id: '003', customer: 'Lê Văn C', product: 'Case Premium Leather', value: 980000, status: 'Chờ xác nhận' },
  { id: '004', customer: 'Phạm Thị D', product: 'Cue PRO Series', value: 3750000, status: 'Hoàn thành' },
  { id: '005', customer: 'Hoàng Văn E', product: 'Accessories Pack VIP', value: 1250000, status: 'Đang giao' },
];

// Admin sidebar menu items
const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'products', label: 'Quản lý sản phẩm', icon: '🛒' },
  { id: 'orders', label: 'Đơn hàng', icon: '📦' },
  { id: 'users', label: 'Người dùng', icon: '👥' },
  { id: 'settings', label: 'Cài đặt', icon: '⚙️' },
  { id: 'analytics', label: 'Thống kê', icon: '📈' },
  { id: 'debug', label: 'Debug Info', icon: '🔍' },
];

const AdminDashboard = () => {
  const { user, logout } = useUser();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState(mockStats);
  const [recentOrders, setRecentOrders] = useState(mockRecentOrders);
  const [lastLogin, setLastLogin] = useState('');
  const navigate = useNavigate();
  
  console.log("AdminDashboard mounted with user:", user);
  
  // Simulate data fetching on component mount
  useEffect(() => {
    // In a real app, you would fetch data from an API here
    // For demo, we'll just set a simulated last login time
    const now = new Date();
    setLastLogin(now.toLocaleString());
    
    // You could also have API calls here to get real data
    // Example:
    // fetchDashboardData().then(data => setStats(data.stats));
    // fetchRecentOrders().then(data => setRecentOrders(data.orders));
    
  }, []);
  
  // Handle logout - this is just an example for the UI
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        
        <div className="admin-user-info">
          <div className="admin-avatar">
            {user?.username?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="admin-user-details">
            <h3>{user?.fullname || user?.username || 'Admin User'}</h3>
            <p>{user?.email || 'admin@example.com'}</p>
            <span className="admin-role-badge">{user?.roleName || 'Unknown Role'}</span>
          </div>
        </div>
        
        <nav className="admin-nav">
          <ul>
            {sidebarItems.map(item => (
              <li 
                key={item.id} 
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="admin-menu-icon">{item.icon}</span>
                <span className="admin-menu-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="admin-sidebar-footer">
          <div className="admin-last-login">
            <small>Đăng nhập lần cuối: {lastLogin || 'Không rõ'}</small>
          </div>
          <Link to="/" className="admin-sidebar-link">
            <span className="admin-menu-icon">🏠</span>
            <span className="admin-menu-label">Về trang chủ</span>
          </Link>
          <button onClick={handleLogout} className="admin-logout-button">
            <span className="admin-menu-icon">🚪</span>
            <span className="admin-menu-label">Đăng xuất</span>
          </button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="admin-content">
        <header className="admin-header">
          <h1>
            {sidebarItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
          </h1>
          <div className="admin-header-actions">
            <span className="admin-access-indicator">
              <span className="admin-access-dot"></span>
              Chỉ dành cho Admin
            </span>
            <button className="admin-button">
              <span>🔔</span>
            </button>
            <button className="admin-button">
              <span>✉️</span>
            </button>
          </div>
        </header>
        
        <div className="admin-main-content">
          {activeSection === 'dashboard' && (
            <div className="admin-dashboard-content">
              <div className="admin-stat-cards">
                <div className="admin-stat-card">
                  <h3>Tổng đơn hàng</h3>
                  <p className="admin-stat-value">{stats.orders}</p>
                  <span className="admin-stat-trend positive">{stats.ordersTrend} so với tuần trước</span>
                </div>
                
                <div className="admin-stat-card">
                  <h3>Doanh thu</h3>
                  <p className="admin-stat-value">{stats.revenue.toLocaleString()} đ</p>
                  <span className="admin-stat-trend positive">{stats.revenueTrend} so với tuần trước</span>
                </div>
                
                <div className="admin-stat-card">
                  <h3>Khách hàng mới</h3>
                  <p className="admin-stat-value">{stats.newCustomers}</p>
                  <span className="admin-stat-trend negative">{stats.customersTrend} so với tuần trước</span>
                </div>
                
                <div className="admin-stat-card">
                  <h3>Sản phẩm đã bán</h3>
                  <p className="admin-stat-value">{stats.productsSold}</p>
                  <span className="admin-stat-trend positive">{stats.productsTrend} so với tuần trước</span>
                </div>
              </div>
              
              <div className="admin-recent-section">
                <h2>Đơn hàng gần đây</h2>
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Khách hàng</th>
                        <th>Sản phẩm</th>
                        <th>Giá trị</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={index}>
                          <td>#{order.id}</td>
                          <td>{order.customer}</td>
                          <td>{order.product}</td>
                          <td>{order.value.toLocaleString()} đ</td>
                          <td>
                            <span className={`admin-status status-${
                              order.status === 'Hoàn thành' ? 'success' :
                              order.status === 'Đang giao' ? 'warning' : 'pending'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <div className="admin-actions">
                              <button className="admin-action-btn view">👁️</button>
                              <button className="admin-action-btn edit">✏️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="admin-view-all">
                  <button className="admin-view-all-btn">Xem tất cả đơn hàng</button>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'debug' && (
            <div className="admin-debug-section">
              <h2>Thông tin Debug</h2>
              <div className="admin-debug-card">
                <h3>Thông tin người dùng</h3>
                <pre>{JSON.stringify(user, null, 2)}</pre>
                <h3>Trạng thái phân quyền</h3>
                <table className="admin-debug-table">
                  <tbody>
                    <tr>
                      <td>Username:</td>
                      <td>{user?.username || 'Không có'}</td>
                    </tr>
                    <tr>
                      <td>Role Name:</td>
                      <td>{user?.roleName || 'Không có'}</td>
                    </tr>
                    <tr>
                      <td>Is Admin?</td>
                      <td>{user?.roleName === 'admin' ? 'Yes ✅' : 'No ❌'}</td>
                    </tr>
                    <tr>
                      <td>User Object:</td>
                      <td>
                        {user ? 'Exists ✅' : 'Missing ❌'}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="admin-debug-actions">
                  <button 
                    onClick={() => {
                      localStorage.setItem('debugUserData', JSON.stringify(user));
                      alert('User data logged to localStorage with key "debugUserData"');
                    }}
                    className="admin-debug-btn"
                  >
                    Lưu thông tin người dùng vào localStorage
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeSection !== 'dashboard' && activeSection !== 'debug' && (
            <div className="admin-section-placeholder">
              <h2>Phần {sidebarItems.find(item => item.id === activeSection)?.label} đang được phát triển</h2>
              <p>Chức năng này sẽ sớm được hoàn thiện.</p>
              <p>Trang này chỉ hiển thị cho người dùng có vai trò admin.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 