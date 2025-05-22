import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Import child components
import DashboardPage from './Dashboard/index';
import ProductsPage from './Products/index';
import OrdersPage from './Orders/index';
import UsersPage from './Users/index';
import SettingsPage from './Settings/index';
import AnalyticsPage from './Analytics/index';
import DebugPage from './Debug/index';

// Admin sidebar menu items
const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'products', label: 'Products Management', icon: '🛒' },
  { id: 'orders', label: 'Orders', icon: '📦' },
  { id: 'users', label: 'Users', icon: '👥' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'debug', label: 'Debug Info', icon: '🔍' },
];

const AdminDashboard = () => {
  const { user, logout } = useUser();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [lastLogin, setLastLogin] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  console.log("AdminDashboard mounted with user:", user);
  
  // Simulate data fetching on component mount
  useEffect(() => {
    // In a real app, you would fetch data from an API here
    // For demo, we'll just set a simulated last login time
    const now = new Date();
    setLastLogin(now.toLocaleString());
  }, []);
  
  // Handle logout - this is just an example for the UI
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Render the appropriate component based on activeSection
  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardPage />;
      case 'products':
        return <ProductsPage />;
      case 'orders':
        return <OrdersPage />;
      case 'users':
        return <UsersPage />;
      case 'settings':
        return <SettingsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'debug':
        return <DebugPage />;
      default:
        return <DashboardPage />;
    }
  };
  
  return (
    <div className="admin-dashboard">
      {/* Mobile menu toggle */}
      <div className="admin-mobile-header">
        <h2>Admin Panel</h2>
        <button className="admin-menu-toggle" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      {/* Sidebar */}
      <aside className={`admin-sidebar ${menuOpen ? 'active' : ''}`}>
        <div className="admin-logo">
          <h2>Admin Panel</h2>
          <button className="admin-close-menu" onClick={toggleMenu}>✕</button>
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
                onClick={() => {
                  setActiveSection(item.id);
                  if (window.innerWidth <= 768) {
                    setMenuOpen(false);
                  }
                }}
              >
                <span className="admin-menu-icon">{item.icon}</span>
                <span className="admin-menu-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="admin-sidebar-footer">
          <div className="admin-last-login">
            <small>Last login: {lastLogin || 'Unknown'}</small>
          </div>
          <Link to="/" className="admin-sidebar-link">
            <span className="admin-menu-icon">🏠</span>
            <span className="admin-menu-label">Back to Home</span>
          </Link>
          <button onClick={handleLogout} className="admin-logout-button">
            <span className="admin-menu-icon">🚪</span>
            <span className="admin-menu-label">Logout</span>
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
              Admin Access Only
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
          {renderActiveComponent()}
        </div>
      </main>
      
      {/* Overlay for mobile */}
      {menuOpen && <div className="admin-sidebar-overlay" onClick={() => setMenuOpen(false)}></div>}
    </div>
  );
};

export default AdminDashboard; 