import React, { useState, useEffect } from 'react';
import './styles.css';

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    amount: ''
  });
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Smith',
      date: '2023-10-08',
      total: 125.99,
      status: 'completed',
      items: 3
    },
    {
      id: 'ORD-002',
      customer: 'Alice Johnson',
      date: '2023-10-07',
      total: 89.50,
      status: 'processing',
      items: 2
    },
    {
      id: 'ORD-003',
      customer: 'Robert Davis',
      date: '2023-10-07',
      total: 212.75,
      status: 'completed',
      items: 4
    },
    {
      id: 'ORD-004',
      customer: 'Emma Wilson',
      date: '2023-10-06',
      total: 45.00,
      status: 'shipped',
      items: 1
    },
    {
      id: 'ORD-005',
      customer: 'Michael Brown',
      date: '2023-10-05',
      total: 312.40,
      status: 'cancelled',
      items: 6
    },
    {
      id: 'ORD-006',
      customer: 'Sarah Miller',
      date: '2023-10-05',
      total: 78.25,
      status: 'processing',
      items: 2
    },
    {
      id: 'ORD-007',
      customer: 'David Wilson',
      date: '2023-10-04',
      total: 145.80,
      status: 'shipped',
      items: 3
    },
    {
      id: 'ORD-008',
      customer: 'Jennifer Taylor',
      date: '2023-10-03',
      total: 67.99,
      status: 'completed',
      items: 1
    }
  ]);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    
    // Simulate filter loading
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you would perform the search here
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };
  
  // Map status to appropriate status class
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
      <div className="orders-container">
        {/* Header skeleton */}
        <div className="admin-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="section-header" style={{ marginBottom: 0 }}>
            <div className="admin-skeleton" style={{ height: '1.8rem', width: '180px' }}></div>
            <div className="admin-skeleton" style={{ height: '2.2rem', width: '220px' }}></div>
          </div>
        </div>
        
        {/* Filters skeleton */}
        <div className="admin-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="admin-skeleton" style={{ height: '42px', width: '100%' }}></div>
        </div>
        
        {/* Table skeleton */}
        <div className="admin-recent-section">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                  <th><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i}>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '80%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '60%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '50%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '70%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '40%' }}></div></td>
                    <td><div className="admin-skeleton" style={{ height: '1rem', width: '90%' }}></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      {/* Header with search */}
      <div className="admin-card">
        <div className="section-header">
          <div>
            <h2>Order Management</h2>
            <p className="section-subtitle">View and manage customer orders</p>
          </div>
          <div className="header-actions">
            <button className="admin-action-button">
              <span>➕</span> New Order
            </button>
            <button className="admin-action-button secondary">
              <span>📥</span> Export CSV
            </button>
          </div>
        </div>
      </div>
      
      {/* Filter controls */}
      <div className="admin-card filter-controls">
        <form onSubmit={handleSearch} className="search-filters-container">
          <div className="admin-search-container">
            <span className="admin-search-icon">🔍</span>
            <input 
              type="text" 
              className="admin-search-input" 
              placeholder="Search by order ID, customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="admin-action-button search-button">Search</button>
          </div>
          
          <div className="filters-row">
            <div className="admin-form-group">
              <label htmlFor="status" className="admin-form-label">Status:</label>
              <select 
                id="status"
                name="status"
                className="admin-form-input"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="dateRange" className="admin-form-label">Date Range:</label>
              <select 
                id="dateRange"
                name="dateRange"
                className="admin-form-input"
                value={filters.dateRange}
                onChange={handleFilterChange}
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="amount" className="admin-form-label">Amount:</label>
              <select 
                id="amount"
                name="amount"
                className="admin-form-input"
                value={filters.amount}
                onChange={handleFilterChange}
              >
                <option value="">All Amounts</option>
                <option value="small">Under $50</option>
                <option value="medium">$50 - $150</option>
                <option value="large">Over $150</option>
              </select>
            </div>
            
            {(filters.status || filters.dateRange || filters.amount) && (
              <button 
                className="admin-action-button secondary clear-filters-btn"
                onClick={() => setFilters({ status: '', dateRange: '', amount: '' })}
                type="button"
              >
                Clear Filters
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Orders table */}
      <div className="admin-recent-section">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    <div className="admin-empty-state">
                      <div className="admin-empty-icon">📋</div>
                      <h3 className="admin-empty-title">No orders found</h3>
                      <p className="admin-empty-text">Try adjusting your filters or search terms</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`admin-status ${getStatusClass(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td>{order.items}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="admin-action-btn view" title="View details">
                          <span>👁️</span>
                        </button>
                        <button className="admin-action-btn edit" title="Process order">
                          <span>✓</span>
                        </button>
                        <button className="admin-action-btn" title="Print invoice">
                          <span>🖨️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="pagination-container">
          <div className="pagination-info">Showing 1-8 of 24 orders</div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>Previous</button>
            <div className="pagination-pages">
              <button className="pagination-page active">1</button>
              <button className="pagination-page">2</button>
              <button className="pagination-page">3</button>
            </div>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders; 