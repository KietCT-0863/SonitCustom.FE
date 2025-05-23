import React, { useState, useEffect } from 'react';
import './styles.css';

const Analytics = () => {
  // Thêm loading state
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('this-month');
  
  // Simulated data
  const [analyticsData, setAnalyticsData] = useState({
    summary: [
      { id: 1, title: 'Total Sales', value: '$24,350', change: '+12%', changeType: 'positive', icon: '💰' },
      { id: 2, title: 'Orders', value: '156', change: '+8%', changeType: 'positive', icon: '📦' },
      { id: 3, title: 'Customers', value: '84', change: '+24%', changeType: 'positive', icon: '👥' },
      { id: 4, title: 'Conversion Rate', value: '3.2%', change: '-0.8%', changeType: 'negative', icon: '📊' }
    ],
    topProducts: [
      { id: 1, name: 'Premium Leather Wallet', category: 'Accessories', price: '$89.99', sold: 64, revenue: '$5,759.36' },
      { id: 2, name: 'Custom Engraved Watch', category: 'Watches', price: '$199.99', sold: 28, revenue: '$5,599.72' },
      { id: 3, name: 'Handcrafted Belt', category: 'Accessories', price: '$59.99', sold: 47, revenue: '$2,819.53' },
      { id: 4, name: 'Leather Smartphone Case', category: 'Tech Accessories', price: '$39.99', sold: 53, revenue: '$2,119.47' }
    ],
    chartData: {
      type: 'bar',
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }
  });

  // Fetch data simulation
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle time range change
  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
    // In a real app, you would fetch new data based on the selected time range
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="analytics-container">
        {/* Header skeleton */}
        <div className="admin-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="section-header" style={{ marginBottom: 0 }}>
            <div className="admin-skeleton" style={{ height: '1.8rem', width: '180px' }}></div>
            <div className="admin-skeleton" style={{ height: '2.2rem', width: '140px' }}></div>
          </div>
        </div>
        
        {/* Summary cards skeleton */}
        <div className="admin-grid-container">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="admin-card">
              <div className="stat-header">
                <div className="admin-skeleton" style={{ height: '1rem', width: '100px' }}></div>
                <div className="admin-skeleton" style={{ height: '40px', width: '40px', borderRadius: 'var(--radius-md)' }}></div>
              </div>
              <div className="admin-skeleton" style={{ height: '2rem', width: '80%', marginBottom: 'var(--space-sm)' }}></div>
              <div className="admin-skeleton" style={{ height: '1rem', width: '60%' }}></div>
            </div>
          ))}
        </div>
        
        {/* Charts skeleton */}
        <div className="admin-card" style={{ marginTop: 'var(--space-xl)', height: '300px' }}>
          <div className="admin-skeleton" style={{ height: '1.5rem', width: '150px', marginBottom: 'var(--space-md)' }}></div>
          <div className="admin-skeleton" style={{ height: 'calc(100% - 2.5rem)', width: '100%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      {/* Header with filter */}
      <div className="admin-card">
        <div className="section-header">
          <div>
            <h2>Analytics Dashboard</h2>
            <p className="section-subtitle">View performance metrics and trends</p>
          </div>
          <div className="header-actions">
            <div className="admin-form-group" style={{ margin: 0 }}>
              <label htmlFor="timeRange" className="admin-form-label">Time Period:</label>
              <select 
                id="timeRange" 
                className="admin-form-input" 
                value={timeRange}
                onChange={handleTimeRangeChange}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Analytics summary cards */}
      <div className="admin-grid-container analytics-summary">
        {analyticsData.summary.map(item => (
          <div className="admin-card stat-card" key={item.id}>
            <div className="stat-header">
              <h3>{item.title}</h3>
              <div className="stat-icon">{item.icon}</div>
            </div>
            <div className="stat-value">{item.value}</div>
            <div className={`stat-trend ${item.changeType}`}>
              {item.change} from last month
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="admin-card">
        <div className="section-header">
          <h2>Monthly Sales Performance</h2>
          <div className="chart-legend">
            <span className="legend-item"><span className="legend-color revenue"></span> Revenue</span>
            <span className="legend-item"><span className="legend-color orders"></span> Orders</span>
          </div>
        </div>
        <div className="analytics-chart">
          {/* In a real app, you would use a chart library like Chart.js or Recharts */}
          <div className="chart-placeholder">
            <div className="chart-grid">
              {analyticsData.chartData.labels.map((label, index) => (
                <div key={index} className="chart-column">
                  <div 
                    className="chart-bar revenue" 
                    style={{ height: `${Math.random() * 150 + 50}px` }}
                  ></div>
                  <div 
                    className="chart-bar orders" 
                    style={{ height: `${Math.random() * 100 + 30}px` }}
                  ></div>
                  <div className="chart-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Products */}
      <div className="admin-recent-section">
        <div className="section-header">
          <h2>Top Performing Products</h2>
          <div className="header-actions">
            <button className="admin-action-button secondary">Export Data</button>
            <button className="admin-action-button">View All Products</button>
          </div>
        </div>
        
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topProducts.map(product => (
                <tr key={product.id}>
                  <td><strong>{product.name}</strong></td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.sold}</td>
                  <td><span className="value-highlight">{product.revenue}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="admin-view-all">
          <button className="admin-view-all-btn">
            View Full Analytics Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 