import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import './styles.css';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, isAdmin } = useUser();
  const navigate = useNavigate();
  
  // Get the user role, accounting for both rolename (from backend) and roleName (frontend normalized)
  const getUserRole = () => {
    if (!user) return null;
    return (user.rolename || user.roleName || '').toLowerCase();
  };
  
  // Convert roles to lowercase for comparison
  const userRole = getUserRole();
  const requiredRoleLower = requiredRole?.toLowerCase();
  
  // Enhanced logging for debugging
  useEffect(() => {
    "ProtectedRoute check:", { 
      user,
      userRoleOriginal: user?.rolename || user?.roleName,
      userRole,
      requiredRole,
      requiredRoleLower, 
      loading,
      hasAccess: userRole === requiredRoleLower,
      isAdminFunction: typeof isAdmin === 'function' ? isAdmin() : null,
      localStorage: {
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        userData: localStorage.getItem('userData')
      }
    };
  }, [user, userRole, requiredRole, requiredRoleLower, loading, isAdmin]);
  
  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="protected-loading-container">
        <div className="protected-loading-spinner"></div>
        <p>Đang tải...</p>
      </div>
    );
  }
  
  // Check if user is logged in
  if (!user) {
    console.log("User not logged in, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  // Check for admin route
  const isAdminRoute = requiredRoleLower === 'admin';
  
  // For admin routes, use the isAdmin function from context if available
  if (isAdminRoute && typeof isAdmin === 'function') {
    if (!isAdmin()) {
      console.log("User doesn't have admin privileges, access denied");
      return renderAccessDenied();
    }
  } 
  // Otherwise, check role directly
  else if (requiredRole && userRole !== requiredRoleLower) {
    console.log(`User role (${userRole}) doesn't match required role (${requiredRoleLower}), access denied`);
    
    // If the user is trying to access admin pages but doesn't have admin role
    if (isAdminRoute) {
      return renderAccessDenied();
    }
    
    // For other restricted areas, just redirect to 404
    return <Navigate to="/404" replace />;
  }
  
  // Helper function to render access denied page
  function renderAccessDenied() {
    return (
      <div className="access-denied-container">
        <div className="access-denied-content">
          <h2>Truy cập bị từ chối</h2>
          <p>Bạn không có quyền truy cập trang quản trị.</p>
          <p>Tài khoản hiện tại: <strong>{user.username}</strong></p>
          <p>Vai trò hiện tại: <strong>{user.rolename || user.roleName || 'Không xác định'}</strong></p>
          <p>Vai trò yêu cầu: <strong>Admin</strong></p>
          <button 
            className="access-denied-button"
            onClick={() => navigate('/')}
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }
  
  // User is authenticated and has the required role
  console.log("Access granted to protected route");
  return children;
};

export default ProtectedRoute; 