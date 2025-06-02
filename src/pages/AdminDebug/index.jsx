import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import './styles.css';

const AdminDebug = () => {
  const { user, isAdmin } = useUser();
  const [localStorageData, setLocalStorageData] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    user: true,
    localStorage: false,
    roleCheck: false
  });

  // Get localStorage data for debugging
  useEffect(() => {
    const data = {
      isAuthenticated: localStorage.getItem('isAuthenticated'),
      userData: localStorage.getItem('userData'),
    };
    setLocalStorageData(data);
  }, []);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Format JSON for display
  const formatJson = (json) => {
    return JSON.stringify(json, null, 2);
  };

  // Check if user is admin using various methods
  const adminChecks = {
    isAdminFunction: typeof isAdmin === 'function' ? isAdmin() : 'isAdmin is not a function',
    roleName: user?.roleName?.toLowerCase() === 'admin',
    rolename: user?.rolename?.toLowerCase() === 'admin',
    normalizedCheck: (user?.rolename || user?.roleName || '').toLowerCase() === 'admin'
  };

  return (
    <div className="admin-debug-page">
      <div className="admin-debug-header">
        <h1>Admin Authentication Debug</h1>
        <p>This page shows authentication details to help troubleshoot admin access issues.</p>
      </div>

      <div className="debug-actions">
        <Link to="/admin/dashboard" className="debug-button">
          Go to Admin Dashboard
        </Link>
        <Link to="/" className="debug-button secondary">
          Back to Homepage
        </Link>
      </div>

      <div className="debug-section">
        <div 
          className="debug-section-header" 
          onClick={() => toggleSection('user')}
        >
          <h2>User Context Data</h2>
          <span>{expandedSections.user ? '▼' : '▶'}</span>
        </div>
        {expandedSections.user && (
          <div className="debug-section-content">
            {user ? (
              <div className="debug-info">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Full Name:</strong> {user.fullname || 'Not set'}</p>
                <p><strong>Email:</strong> {user.email || 'Not set'}</p>
                <p><strong>Role Name (roleName):</strong> {user.roleName || 'Not set'}</p>
                <p><strong>Role Name (rolename):</strong> {user.rolename || 'Not set'}</p>
                <pre className="debug-json">{formatJson(user)}</pre>
              </div>
            ) : (
              <p className="error-text">User is not logged in</p>
            )}
          </div>
        )}
      </div>

      <div className="debug-section">
        <div 
          className="debug-section-header" 
          onClick={() => toggleSection('roleCheck')}
        >
          <h2>Admin Role Check</h2>
          <span>{expandedSections.roleCheck ? '▼' : '▶'}</span>
        </div>
        {expandedSections.roleCheck && (
          <div className="debug-section-content">
            <div className="debug-info">
              <p>
                <strong>isAdmin() function result:</strong> 
                <span className={adminChecks.isAdminFunction === true ? 'success-text' : 'error-text'}>
                  {adminChecks.isAdminFunction === true ? 'true' : 
                   adminChecks.isAdminFunction === false ? 'false' : 
                   String(adminChecks.isAdminFunction)}
                </span>
              </p>
              <p>
                <strong>Check by roleName:</strong> 
                <span className={adminChecks.roleName ? 'success-text' : 'error-text'}>
                  {String(adminChecks.roleName)}
                </span>
              </p>
              <p>
                <strong>Check by rolename:</strong> 
                <span className={adminChecks.rolename ? 'success-text' : 'error-text'}>
                  {String(adminChecks.rolename)}
                </span>
              </p>
              <p>
                <strong>Normalized check:</strong> 
                <span className={adminChecks.normalizedCheck ? 'success-text' : 'error-text'}>
                  {String(adminChecks.normalizedCheck)}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="debug-section">
        <div 
          className="debug-section-header" 
          onClick={() => toggleSection('localStorage')}
        >
          <h2>LocalStorage Data</h2>
          <span>{expandedSections.localStorage ? '▼' : '▶'}</span>
        </div>
        {expandedSections.localStorage && (
          <div className="debug-section-content">
            <div className="debug-info">
              <p><strong>isAuthenticated:</strong> {localStorageData.isAuthenticated || 'Not set'}</p>
              <p><strong>userData:</strong></p>
              <pre className="debug-json">{localStorageData.userData || 'Not set'}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDebug; 