import React, { useState } from 'react';
import './styles.css';

const Orders = () => {
  const [orders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Smith',
      date: '2023-10-08',
      total: 125.99,
      status: 'Completed',
      items: 3
    },
    {
      id: 'ORD-002',
      customer: 'Alice Johnson',
      date: '2023-10-07',
      total: 89.50,
      status: 'Processing',
      items: 2
    },
    {
      id: 'ORD-003',
      customer: 'Robert Davis',
      date: '2023-10-07',
      total: 212.75,
      status: 'Completed',
      items: 4
    },
    {
      id: 'ORD-004',
      customer: 'Emma Wilson',
      date: '2023-10-06',
      total: 45.00,
      status: 'Shipped',
      items: 1
    },
    {
      id: 'ORD-005',
      customer: 'Michael Brown',
      date: '2023-10-05',
      total: 312.40,
      status: 'Cancelled',
      items: 6
    },
    {
      id: 'ORD-006',
      customer: 'Sarah Miller',
      date: '2023-10-05',
      total: 78.25,
      status: 'Processing',
      items: 2
    },
    {
      id: 'ORD-007',
      customer: 'David Wilson',
      date: '2023-10-04',
      total: 145.80,
      status: 'Shipped',
      items: 3
    },
    {
      id: 'ORD-008',
      customer: 'Jennifer Taylor',
      date: '2023-10-03',
      total: 67.99,
      status: 'Completed',
      items: 1
    }
  ]);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Order Management</h2>
        <div className="orders-actions">
          <div className="search-container">
            <input type="text" placeholder="Search orders..." className="search-input" />
            <button className="search-button">Search</button>
          </div>
          <button className="export-btn">Export Orders</button>
        </div>
      </div>
      
      <div className="orders-filters">
        <div className="filter-group">
          <label>Status:</label>
          <select>
            <option value="">All Statuses</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Date Range:</label>
          <select>
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Amount:</label>
          <select>
            <option value="">All Amounts</option>
            <option value="small">Under $50</option>
            <option value="medium">$50 - $150</option>
            <option value="large">Over $150</option>
          </select>
        </div>
      </div>
      
      <div className="orders-table-container">
        <table className="orders-table">
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
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.items}</td>
                <td className="action-buttons">
                  <button className="view-btn">View</button>
                  <button className="process-btn">Process</button>
                  <button className="invoice-btn">Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination">
        <button className="pagination-btn">Previous</button>
        <span className="pagination-page active">1</span>
        <span className="pagination-page">2</span>
        <span className="pagination-page">3</span>
        <button className="pagination-btn">Next</button>
      </div>
    </div>
  );
};

export default Orders; 