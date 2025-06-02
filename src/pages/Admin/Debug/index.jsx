import React, { useState, useEffect } from 'react';
import { useUser } from '../../../contexts/UserContext';
import './styles.css';
import AuthService from '../../../services/auth.service';

const DebugPage = () => {
  const { user, loading } = useUser();
  const [localStorageData, setLocalStorageData] = useState({});
  const [cookieData, setCookieData] = useState('');

  useEffect(() => {
    // Get localStorage data
    const getData = () => {
      try {
        const userData = localStorage.getItem('userData');
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const authError = localStorage.getItem('authError');

        setLocalStorageData({
          userData: userData ? JSON.parse(userData) : null,
          isAuthenticated,
          authError
        });

        // Get cookies (Note: won't work for HttpOnly cookies)
        setCookieData(document.cookie);
      } catch (error) {
        console.error('Error reading data:', error);
      }
    };

    getData();
    // Update data every 2 seconds to reflect changes
    const interval = setInterval(getData, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="debug-container">
      <div className="admin-card">
        <h2>Authentication Debug</h2>
        <p>This page displays information about the current authentication state.</p>
      </div>

      <div className="admin-card">
        <h3>User Context</h3>
        <div className="debug-section">
          <p><strong>Loading State:</strong> {loading ? 'Loading...' : 'Loaded'}</p>
          <p><strong>Is User Set:</strong> {user ? 'Yes' : 'No'}</p>
          {user && (
            <div className="debug-json">
              <h4>User Object:</h4>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="admin-card">
        <h3>Local Storage Data</h3>
        <div className="debug-section">
          <p><strong>Is Authenticated Flag:</strong> {localStorageData.isAuthenticated || 'Not set'}</p>
          <p><strong>Auth Error:</strong> {localStorageData.authError || 'None'}</p>
          
          {localStorageData.userData && (
            <div className="debug-json">
              <h4>User Data from Local Storage:</h4>
              <pre>{JSON.stringify(localStorageData.userData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="admin-card">
        <h3>Auth Service Status</h3>
        <div className="debug-section">
          <p><strong>getCurrentUser():</strong></p>
          <pre>{JSON.stringify(AuthService.getCurrentUser(), null, 2)}</pre>
          <p><strong>isAuthenticated():</strong> {AuthService.isAuthenticated() ? 'Yes' : 'No'}</p>
          <p><strong>getAuthError():</strong> {AuthService.getAuthError() || 'None'}</p>
        </div>
      </div>

      <div className="admin-card">
        <h3>Cookie Data</h3>
        <div className="debug-section">
          <p>Note: HttpOnly cookies cannot be accessed via JavaScript.</p>
          <pre>{cookieData || 'No accessible cookies found'}</pre>
        </div>
      </div>

      <div className="admin-card">
        <h3>Testing Tools</h3>
        <div className="debug-section">
          <button 
            className="admin-action-button"
            onClick={() => {
              localStorage.removeItem('userData');
              localStorage.removeItem('isAuthenticated');
              localStorage.removeItem('authError');
              alert('Local storage cleared!');
            }}
          >
            Clear Local Storage
          </button>
          
          <button 
            className="admin-action-button"
            onClick={() => {
              document.cookie.split(";").forEach(function(c) { 
                document.cookie = c.replace(/^ +/, "")
                  .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
              });
              alert('Cookies cleared!');
            }}
          >
            Clear Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugPage; 