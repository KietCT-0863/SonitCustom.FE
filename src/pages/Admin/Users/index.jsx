import React, { useState, useEffect } from 'react';
import './styles.css';

const Users = () => {
  // Simulated data for users
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Alice Johnson', email: 'alice@example.com', role: 'Customer', status: 'Active' },
    { id: 3, name: 'Robert Davis', email: 'robert@example.com', role: 'Customer', status: 'Inactive' },
    { id: 4, name: 'Emily Wilson', email: 'emily@example.com', role: 'Manager', status: 'Active' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Customer', status: 'Active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Simulated data fetching
  useEffect(() => {
    // In a real application, you would fetch users data from your API here
    console.log('Users data loaded');
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // In a real app, you would filter users based on search term
  };

  // Handle user deletion
  const handleDeleteUser = (userId) => {
    console.log('Deleting user:', userId);
    setUsers(users.filter(user => user.id !== userId));
  };

  // Handle user edit
  const handleEditUser = (userId) => {
    console.log('Editing user:', userId);
    // In a real app, you would navigate to edit page or open modal
  };

  // Handle add new user
  const handleAddNewUser = () => {
    console.log('Adding new user');
    // In a real app, you would navigate to create page or open modal
  };

  // Filter users based on role and status
  const filteredUsers = users.filter(user => {
    return (
      (selectedRole === '' || user.role === selectedRole) &&
      (selectedStatus === '' || user.status === selectedStatus)
    );
  });

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>User Management</h2>
        <button 
          className="add-user-btn"
          onClick={handleAddNewUser}
        >
          Add New User
        </button>
      </div>

      <div className="users-filters">
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>

        <div className="filter-group">
          <label htmlFor="role-filter">Role:</label>
          <select
            id="role-filter"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th className="id-column">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="id-column">#{user.id}</td>
                  <td>{user.name}</td>
                  <td className="email-column">{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="actions-column">
                    <div className="action-buttons">
                      <button 
                        className="view-btn"
                        onClick={() => console.log('View user', user.id)}
                      >
                        View
                      </button>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditUser(user.id)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">
                  No users found. Try adjusting your filters.
                </td>
              </tr>
            )}
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

export default Users; 