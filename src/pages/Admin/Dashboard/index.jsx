import React, { useState, useEffect } from 'react';
import './styles.css';

const Dashboard = () => {
  // Simulated data for dashboard
  const [dashboardData, setDashboardData] = useState({
    stats: [
      { id: 1, title: 'Total Revenue', value: '$12,380', change: '+8.3%', changeType: 'positive', icon: '💰' },
      { id: 2, title: 'Total Orders', value: '578', change: '+12.2%', changeType: 'positive', icon: '📦' },
      { id: 3, title: 'New Customers', value: '129', change: '+3.1%', changeType: 'positive', icon: '👥' },
      { id: 4, title: 'Conversion Rate', value: '3.8%', change: '-0.5%', changeType: 'negative', icon: '📊' }
    ],
    recentOrders: [
      { id: 'ORD-0012', customer: 'John Smith', date: '2023-05-10', amount: '$120.50', status: 'completed' },
      { id: 'ORD-0011', customer: 'Emily Johnson', date: '2023-05-09', amount: '$85.99', status: 'shipped' },
      { id: 'ORD-0010', customer: 'Michael Brown', date: '2023-05-09', amount: '$250.00', status: 'processing' },
      { id: 'ORD-0009', customer: 'Olivia Williams', date: '2023-05-08', amount: '$75.20', status: 'cancelled' },
      { id: 'ORD-0008', customer: 'James Davis', date: '2023-05-08', amount: '$32.99', status: 'completed' },
    ]
  });

  // Simulated loading state
  const [loading, setLoading] = useState(true);
  
  // Fetch dashboard data (simulated)
  useEffect(() => {
    // In a real application, you would fetch data from your API here
    // For this example, we'll simulate loading with a timeout
    const timer = setTimeout(() => {
      setLoading(false);
      console.log('Dashboard data loaded');
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  // Quick actions
  const handleQuickAction = (action) => {
    console.log(`Quick action triggered: ${action}`);
    // In a real app, you would handle these actions
  };

  // Map status to appropriate classes
  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'status-success';
      case 'shipped': return 'status-pending';
      case 'processing': return 'status-warning';
      case 'cancelled': return 'status-danger';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="admin-card" style={{height: '100px', marginBottom: 'var(--space-lg)'}}>
          <div className="admin-skeleton" style={{height: '2rem', width: '180px', marginBottom: 'var(--space-md)'}}></div>
          <div className="admin-skeleton" style={{height: '1rem', width: '70%'}}></div>
        </div>
        
        <div className="admin-grid-container">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="admin-card">
              <div className="admin-skeleton" style={{height: '1.5rem', width: '40%', marginBottom: 'var(--space-md)'}}></div>
              <div className="admin-skeleton" style={{height: '2.5rem', width: '60%', marginBottom: 'var(--space-md)'}}></div>
              <div className="admin-skeleton" style={{height: '1rem', width: '80%'}}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Welcome section */}
      <div className="admin-card dashboard-welcome">
        <h2>Dashboard Overview</h2>
        <p>Welcome to your administration dashboard. Here's what's happening today.</p>
        
        <div className="admin-search-container">
          <span className="admin-search-icon"></span>
          <input 
            type="text"
            className="admin-search-input"
            placeholder="Search orders, products, customers..."
          />
        </div>
      </div>

      {/* Stats cards */}
      <div className="admin-grid-container dashboard-stats">
        {dashboardData.stats.map(stat => (
          <div className="admin-card stat-card" key={stat.id}>
            <div className="stat-header">
              <h3>{stat.title}</h3>
              <div className="stat-icon">{stat.icon}</div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-trend ${stat.changeType === 'positive' ? 'positive' : 'negative'}`}>
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="admin-recent-section">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <div className="header-actions">
            <button className="admin-action-button secondary">Export</button>
            <button className="admin-action-button">+ New Order</button>
          </div>
        </div>
        
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentOrders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span className={`admin-status ${getStatusClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-action-btn view" title="View details">
                        <span>👁️</span>
                      </button>
                      <button className="admin-action-btn edit" title="Edit order">
                        <span>✏️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="admin-view-all">
          <button className="admin-view-all-btn" onClick={() => handleQuickAction('viewOrders')}>
            View All Orders
          </button>
        </div>
      </div>

      {/* Quick actions */}
      <div className="admin-card">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <button className="admin-action-button" onClick={() => handleQuickAction('addProduct')}>
            <span>➕</span> Add New Product
          </button>
          <button className="admin-action-button" onClick={() => handleQuickAction('viewOrders')}>
            <span>📋</span> View Recent Orders
          </button>
          <button className="admin-action-button" onClick={() => handleQuickAction('manageUsers')}>
            <span>👥</span> Manage Users
          </button>
          <button className="admin-action-button" onClick={() => handleQuickAction('updateInventory')}>
            <span>🔄</span> Update Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 