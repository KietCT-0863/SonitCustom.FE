import React, { useState } from 'react';
import './styles.css';

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2023-10-08 14:23'
    },
    {
      id: 2,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Customer',
      status: 'Active',
      lastLogin: '2023-10-07 09:45'
    },
    {
      id: 3,
      name: 'Robert Davis',
      email: 'robert@example.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2023-10-07 16:30'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma@example.com',
      role: 'Customer',
      status: 'Inactive',
      lastLogin: '2023-09-28 11:15'
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael@example.com',
      role: 'Customer',
      status: 'Active',
      lastLogin: '2023-10-05 08:20'
    },
    {
      id: 6,
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      role: 'Customer',
      status: 'Suspended',
      lastLogin: '2023-09-15 10:05'
    },
    {
      id: 7,
      name: 'David Wilson',
      email: 'david@example.com',
      role: 'Staff',
      status: 'Active',
      lastLogin: '2023-10-04 13:40'
    }
  ]);

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>User Management</h2>
        <div className="users-actions">
          <button className="add-user-btn">Add New User</button>
          <div className="search-container">
            <input type="text" placeholder="Search users..." className="search-input" />
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>
      
      <div className="users-filters">
        <div className="filter-group">
          <label>Role:</label>
          <select>
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Status:</label>
          <select>
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>
      
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td className="action-buttons">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                  <button className="view-btn">View</button>
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
        <button className="pagination-btn">Next</button>
      </div>
    </div>
  );
};

export default Users; 