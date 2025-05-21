import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import './styles.css';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useUser();
  
  // Logging for debugging
  console.log("ProtectedRoute check:", { 
    user, 
    userRoleName: user?.roleName, 
    requiredRole, 
    loading,
    hasAccess: user?.roleName === requiredRole
  });
  
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
  
  // If role is required, check user's role
  if (requiredRole && user.roleName !== requiredRole) {
    console.log(`User role (${user.roleName}) doesn't match required role (${requiredRole}), redirecting to 404 page`);
    
    // Chuyển hướng đến trang 404 Not Found thay vì hiển thị trang từ chối quyền truy cập
    return <Navigate to="/404" replace />;
  }
  
  // User is authenticated and has the required role
  console.log("Access granted to protected route");
  return children;
};

export default ProtectedRoute; 