import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import AuthService from "../../../services/auth.service";
import api from "../../../config/api.config";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleName: "admin",
  });

  // New state for edit user modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [roles, setRoles] = useState([]);
  const [editUser, setEditUser] = useState({
    id: null,
    username: "",
    fullname: "",
    email: "",
    password: "",
    role: null,
  });

  const [focusedInputs, setFocusedInputs] = useState({
    username: false,
    fullname: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Sample user data to use when API fails
  const sampleUsers = [
    {
      id: 1,
      username: "admin",
      fullname: "Admin User",
      email: "admin@example.com",
      roleName: "admin",
    },
    {
      id: 2,
      username: "user1",
      fullname: "Regular User",
      email: "user1@example.com",
      roleName: "user",
    },
    {
      id: 3,
      username: "manager",
      fullname: "Manager User",
      email: "manager@example.com",
      roleName: "admin",
    },
  ];

  // Load data on component mount
  useEffect(() => {
    // Nếu đã load user và không phải admin thì chuyển hướng về login
    if (user && !isAdmin()) {
      navigate("/login", {
        state: {
          from: "/admin/users",
          message: "Bạn cần đăng nhập với tài khoản admin.",
        },
      });
    }
  }, [user, isAdmin, navigate]);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/User");
      setUsers(response);
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);

      // Handle auth errors
      if (err.message && err.message.includes("Phiên đăng nhập")) {
        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        // Redirect to login after showing the error
        setTimeout(() => {
          window.location.href =
            "/login?redirect=" + encodeURIComponent(window.location.pathname);
        }, 2000);
        return;
      }

      // Use sample data for demonstration
      setUsers(sampleUsers);

      if (err.response && err.response.status === 401) {
        setError(
          "Authentication required. Vui lòng đăng nhập với tài khoản admin."
        );
      } else {
        setError("API connection issue. Đang hiển thị dữ liệu mẫu.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch roles from API
  const fetchRoles = async () => {
    try {
      const response = await api.get("/Role");
      setRoles(response);
    } catch (err) {
      console.error("Error fetching roles:", err);
      // Set default roles if API fails
      setRoles([
        { roleId: 1, roleName: "admin" },
        { roleId: 2, roleName: "member" },
      ]);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you might want to add API search or filter locally
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/User/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);

      if (err.message && err.message.includes("Phiên đăng nhập")) {
        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        return;
      }

      // Just remove from local state for demo purposes
      setUsers(users.filter((user) => user.id !== userId));

      if (err.response && err.response.status === 401) {
        setError(
          "Authentication failed. Just removed from UI for demo purposes."
        );
      } else {
        setError("API error. Just removed from UI for demo purposes.");
      }
    }
  };

  // Handle user edit
  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);

    if (userToEdit) {
      setEditUser({
        id: userToEdit.id,
        username: userToEdit.username || "",
        fullname: userToEdit.fullname || "",
        email: userToEdit.email || "",
        password: "",
        role: userToEdit.roleId || null,
      });

      setShowEditModal(true);
      setUpdateSuccess(false);
    }
  };

  // Handle add new user
  const handleAddNewUser = () => {
    setShowRegisterModal(true);
    setRegistrationSuccess(false);
  };

  // Handle input focus
  const handleFocus = (name) => {
    setFocusedInputs((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // Handle input blur
  const handleBlur = (name) => {
    setFocusedInputs((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  // Handle input changes for registration form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear password error when password fields change
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  // Handle input changes for edit form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    if (newUser.password !== newUser.confirmPassword) {
      setPasswordError("Mật khẩu không khớp");
      return false;
    }

    if (newUser.password.length < 8) {
      setPasswordError("Mật khẩu phải có ít nhất 8 ký tự");
      return false;
    }

    return true;
  };

  // Handle register admin form submission
  const handleRegisterAdmin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsRegistering(true);
      // Tạo user object để gửi đến API theo định dạng của API register
      const userToRegister = {
        username: newUser.username,
        fullname: newUser.fullname,
        email: newUser.email,
        password: newUser.password,
        roleName: newUser.roleName,
      };

      // Sử dụng API đăng ký giống với user thông thường
      const response = await AuthService.register(userToRegister);

      // Nếu đăng ký thành công
      if (
        response &&
        response.message &&
        response.message.includes("thành công")
      ) {
        setRegistrationSuccess(true);
        // Refresh danh sách user sau khi đăng ký thành công
        fetchUsers();

        // Reset form sau 2 giây
        setTimeout(() => {
          setShowRegisterModal(false);
          setNewUser({
            username: "",
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
            roleName: "admin",
          });
          setRegistrationSuccess(false);
        }, 2000);
      } else {
        setError("Đăng ký không thành công. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Error registering admin:", err);

      if (err.message) {
        setPasswordError(err.message);
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setPasswordError(err.response.data.message);
      } else {
        setPasswordError("Đăng ký không thành công. Vui lòng thử lại.");
      }

      // Add locally for demo purposes in case of error
      if (process.env.NODE_ENV === "development") {
        const newDemoUser = {
          ...newUser,
          id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        };
        delete newDemoUser.confirmPassword;

        setUsers([...users, newDemoUser]);
        setTimeout(() => {
          setShowRegisterModal(false);
          setNewUser({
            username: "",
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
            roleName: "admin",
          });
        }, 2000);
      }
    } finally {
      setIsRegistering(false);
    }
  };

  // Handle update user form submission
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      setIsUpdating(true);

      // Create update object
      const updateData = {
        username: editUser.username || null,
        password: editUser.password || null,
        fullname: editUser.fullname || null,
        email: editUser.email || null,
        role: editUser.role,
      };

      // Call API to update user
      await api.put(`/User/${editUser.id}`, updateData);

      setUpdateSuccess(true);

      // Refresh user list
      fetchUsers();

      // Close modal after delay
      setTimeout(() => {
        setShowEditModal(false);
        setEditUser({
          id: null,
          username: "",
          fullname: "",
          email: "",
          password: "",
          role: null,
        });
        setUpdateSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error updating user:", err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Cập nhật không thành công. Vui lòng thử lại.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // Filter users based on role and search term
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase());
    return (
      matchesSearch &&
      (selectedRole === "" ||
        user.roleName?.toLowerCase() === selectedRole.toLowerCase())
    );
  });

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>User Management</h2>
        <div className="button-group">
          <button className="add-user-btn" onClick={handleAddNewUser}>
            Add New User
          </button>
          <button className="register-admin-btn" onClick={handleAddNewUser}>
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
                      <span
                        className={`role-badge ${user.roleName?.toLowerCase()}`}
                      >
                        {user.roleName}
                      </span>
                    </td>
                    <td className="actions-column">
                      <div className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() => console.log("View user", user.id)}
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

      {/* Admin Registration Modal - Thiết kế giống với trang Register */}
      {showRegisterModal && (
        <div className="modal-overlay">
          <div className="register-modal-content">
            <div className="register-modal-header">
              <div className="register-logo">
                <img
                  src="/assets/images/logo.jpg"
                  className="register-logo-image"
                />
              </div>
              <h2>Register New Admin</h2>
              <p>Create a new admin account for the system</p>
            </div>

            {registrationSuccess ? (
              <div className="success-message">
                <div className="check-icon">✓</div>
                <h3>Registration Successful!</h3>
                <p>The new admin account has been created successfully.</p>
              </div>
            ) : (
              <form className="register-form" onSubmit={handleRegisterAdmin}>
                <div
                  className={`form-floating ${
                    focusedInputs.username || newUser.username ? "focused" : ""
                  }`}
                >
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder=" "
                    value={newUser.username}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("username")}
                    onBlur={() => handleBlur("username")}
                    required
                  />
                  <label htmlFor="username">Username</label>
                  <div className="input-highlight"></div>
                </div>

                <div
                  className={`form-floating ${
                    focusedInputs.fullname || newUser.fullname ? "focused" : ""
                  }`}
                >
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder=" "
                    value={newUser.fullname}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("fullname")}
                    onBlur={() => handleBlur("fullname")}
                    required
                  />
                  <label htmlFor="fullname">Full Name</label>
                  <div className="input-highlight"></div>
                </div>

                <div
                  className={`form-floating ${
                    focusedInputs.email || newUser.email ? "focused" : ""
                  }`}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    value={newUser.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    required
                  />
                  <label htmlFor="email">Email Address</label>
                  <div className="input-highlight"></div>
                </div>

                <div
                  className={`form-floating ${
                    focusedInputs.password || newUser.password ? "focused" : ""
                  }`}
                >
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder=" "
                    value={newUser.password}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <div className="input-highlight"></div>
                </div>

                <div
                  className={`form-floating ${
                    focusedInputs.confirmPassword || newUser.confirmPassword
                      ? "focused"
                      : ""
                  }`}
                >
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder=" "
                    value={newUser.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("confirmPassword")}
                    onBlur={() => handleBlur("confirmPassword")}
                    required
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-highlight"></div>
                  {passwordError && (
                    <p className="error-message">{passwordError}</p>
                  )}
                </div>

                <div
                  className={`form-floating ${
                    focusedInputs.roleName || newUser.roleName ? "focused" : ""
                  }`}
                >
                  <select
                    id="roleName"
                    name="roleName"
                    value={newUser.roleName}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("roleName")}
                    onBlur={() => handleBlur("roleName")}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <label htmlFor="roleName">Role</label>
                  <div className="input-highlight"></div>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowRegisterModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`register-button ${
                      isRegistering ? "loading" : ""
                    }`}
                    disabled={isRegistering}
                  >
                    {isRegistering ? (
                      <div className="spinner"></div>
                    ) : (
                      "Register Admin"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="register-modal-content">
            <div className="register-modal-header">
              <div className="register-logo">
                <img
                  src="/assets/images/logo.jpg"
                  className="register-logo-image"
                />
              </div>
              <h2>Edit User</h2>
              <p>Update user information</p>
            </div>

            {updateSuccess ? (
              <div className="success-message">
                <div className="check-icon">✓</div>
                <h3>Update Successful!</h3>
                <p>The user information has been updated successfully.</p>
              </div>
            ) : (
              <form className="register-form" onSubmit={handleUpdateUser}>
                <div className="form-floating focused">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder=" "
                    value={editUser.username}
                    onChange={handleEditInputChange}
                  />
                  <label htmlFor="username">Username</label>
                  <div className="input-highlight"></div>
                  <small className="form-text">
                    Leave empty to keep current username
                  </small>
                </div>

                <div className="form-floating focused">
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder=" "
                    value={editUser.fullname}
                    onChange={handleEditInputChange}
                  />
                  <label htmlFor="fullname">Full Name</label>
                  <div className="input-highlight"></div>
                  <small className="form-text">
                    Leave empty to keep current name
                  </small>
                </div>

                <div className="form-floating focused">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    value={editUser.email}
                    onChange={handleEditInputChange}
                  />
                  <label htmlFor="email">Email Address</label>
                  <div className="input-highlight"></div>
                  <small className="form-text">
                    Leave empty to keep current email
                  </small>
                </div>

                <div className="form-floating focused">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder=" "
                    value={editUser.password}
                    onChange={handleEditInputChange}
                  />
                  <label htmlFor="password">Password</label>
                  <div className="input-highlight"></div>
                  <small className="form-text">
                    Leave empty to keep current password
                  </small>
                </div>

                <div className="form-floating focused">
                  <select
                    id="role"
                    name="role"
                    value={editUser.role || ""}
                    onChange={handleEditInputChange}
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.roleId} value={role.roleId}>
                        {role.roleName}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="role">Role</label>
                  <div className="input-highlight"></div>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`register-button ${isUpdating ? "loading" : ""}`}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <div className="spinner"></div>
                    ) : (
                      "Update User"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
