import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    roleName: 'admin'
  });
  
  // Sample user data to use when API fails
  const sampleUsers = [
    { id: 1, username: 'admin', fullname: 'Admin User', email: 'admin@example.com', roleName: 'admin' },
    { id: 2, username: 'user1', fullname: 'Regular User', email: 'user1@example.com', roleName: 'user' },
    { id: 3, username: 'manager', fullname: 'Manager User', email: 'manager@example.com', roleName: 'admin' },
  ];

  // API instance with withCredentials enabled
  const api = axios.create({
    baseURL: 'https://sonitcustom-be.onrender.com/api',
    withCredentials: true, // Đảm bảo gửi cookies với mỗi request
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Sử dụng withCredentials để gửi cookie trong request
      const response = await api.get('/User');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      // Use sample data for demonstration
      setUsers(sampleUsers);
      
      if (err.response && err.response.status === 401) {
        setError('Authentication required. Vui lòng đăng nhập với tài khoản admin.');
      } else {
        setError('API connection issue. Đang hiển thị dữ liệu mẫu.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Load users data on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you might want to add API search or filter locally
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/User/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      // Just remove from local state for demo purposes
      setUsers(users.filter(user => user.id !== userId));
      
      if (err.response && err.response.status === 401) {
        setError('Authentication failed. Just removed from UI for demo purposes.');
      } else {
        setError('API error. Just removed from UI for demo purposes.');
      }
    }
  };

  // Handle user edit
  const handleEditUser = (userId) => {
    console.log('Editing user:', userId);
    // In a real app, you would navigate to edit page or open modal
  };

  // Handle add new user
  const handleAddNewUser = () => {
    setShowRegisterModal(true);
  };

  // Handle register admin form submission
  const handleRegisterAdmin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post('/User', newUser);
      setUsers([...users, response.data]);
      setShowRegisterModal(false);
      setNewUser({
        username: '',
        fullname: '',
        email: '',
        password: '',
        roleName: 'admin'
      });
    } catch (err) {
      console.error('Error registering admin:', err);
      
      // Add locally for demo purposes
      const newDemoUser = {
        ...newUser,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
      };
      setUsers([...users, newDemoUser]);
      setShowRegisterModal(false);
      setNewUser({
        username: '',
        fullname: '',
        email: '',
        password: '',
        roleName: 'admin'
      });
      
      if (err.response && err.response.status === 401) {
        setError('Authentication failed. Added locally for demo purposes.');
      } else {
        setError('API error. Added locally for demo purposes.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes for registration form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter users based on role and search term
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase());
    return (
      matchesSearch &&
      (selectedRole === '' || user.roleName?.toLowerCase() === selectedRole.toLowerCase())
    );
  });

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>User Management</h2>
        <div className="button-group">
          <button 
            className="add-user-btn"
            onClick={handleAddNewUser}
          >
            Add New User
          </button>
          <button 
            className="register-admin-btn"
            onClick={() => setShowRegisterModal(true)}
          >
            Register Admin
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

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
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <div className="users-table-container">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th className="id-column">ID</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="id-column">#{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.fullname}</td>
                    <td className="email-column">{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.roleName?.toLowerCase()}`}>
                        {user.roleName}
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
        )}
      </div>

      <div className="pagination">
        <button className="pagination-btn">Previous</button>
        <span className="pagination-page active">1</span>
        <span className="pagination-page">2</span>
        <span className="pagination-page">3</span>
        <button className="pagination-btn">Next</button>
      </div>

      {/* Admin Registration Modal */}
      {showRegisterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Register New Admin</h2>
            <form onSubmit={handleRegisterAdmin}>
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  name="username" 
                  value={newUser.username} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullname" 
                  value={newUser.fullname} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={newUser.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={newUser.password} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select 
                  name="roleName" 
                  value={newUser.roleName} 
                  onChange={handleInputChange}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowRegisterModal(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Register</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users; 