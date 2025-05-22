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

  // Fetch dashboard data (simulated)
  useEffect(() => {
    // In a real application, you would fetch data from your API here
    // For this example, we'll just use the hardcoded data
    console.log('Dashboard data loaded');
  }, []);

  // Quick actions
  const handleQuickAction = (action) => {
    console.log(`Quick action triggered: ${action}`);
    // In a real app, you would handle these actions
  };

  return (
    <div className="dashboard-container">
      {/* Welcome section */}
      <div className="dashboard-welcome">
        <h2>Dashboard Overview</h2>
        <p>Welcome to your administration dashboard. Here's what's happening today.</p>
      </div>

      {/* Stats cards */}
      <div className="dashboard-stats">
        {dashboardData.stats.map(stat => (
          <div className="stat-card" key={stat.id}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <span className={`stat-change ${stat.changeType}`}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="dashboard-recent recent-orders">
        <h3>Recent Orders</h3>
        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span className={`status ${order.status}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="view-all-link">
          <button className="view-all-button">View All Orders</button>
        </div>
      </div>

      {/* Quick actions */}
      <div className="dashboard-actions action-card">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-button" onClick={() => handleQuickAction('addProduct')}>
            Add New Product
          </button>
          <button className="action-button" onClick={() => handleQuickAction('viewOrders')}>
            View Recent Orders
          </button>
          <button className="action-button" onClick={() => handleQuickAction('manageUsers')}>
            Manage Users
          </button>
          <button className="action-button" onClick={() => handleQuickAction('updateInventory')}>
            Update Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 