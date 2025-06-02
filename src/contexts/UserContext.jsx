import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../config/api.config';
import AuthService from '../services/auth.service';

// Create context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to normalize user data (especially role names)
  const normalizeUserData = (userData) => {
    if (!userData) return null;
    
    // Create a standardized user object that handles both formats
    // Backend may provide "rolename" while frontend uses "roleName"
    return {
      ...userData,
      // Use rolename from backend or fallback to roleName, ensure lowercase
      roleName: (userData.rolename || userData.roleName || '').toLowerCase()
    };
  };

  // Fetch user info on mount if authenticated
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking authentication status on page load/refresh");
      
      // Attempt to restore session from localStorage flag
      const isAuthInStorage = localStorage.getItem('isAuthenticated') === 'true';
      
      if (isAuthInStorage) {
        console.log("Found auth flag in localStorage, trying to get user data");
        
        try {
          // Validate the session with the backend by getting user data
          const userData = await api.get('/User/me');
          
          if (userData) {
            // console.log("Session is valid, setting user data:", userData);
            const normalizedUser = normalizeUserData(userData);
            setUser(normalizedUser);
            localStorage.setItem('userData', JSON.stringify(normalizedUser));
          } else {
            console.log("No user data received");
            setUser(null);
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userData');
          }
        } catch (error) {
          console.error("Session validation failed:", error);
          
          // If there's a network error, use cached user data
          if (error.code === 'ERR_NETWORK') {
            console.warn('Network error detected - using cached user data');
            const storedUser = AuthService.getCurrentUser();
            if (storedUser) setUser(normalizeUserData(storedUser));
          } else {
            // For auth errors, clear the user state
            setUser(null);
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userData');
          }
        }
      } else {
        console.log("Not authenticated according to localStorage");
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = (userData) => {
    const normalizedUser = normalizeUserData(userData);
    setUser(normalizedUser);
    // Also update localStorage
    if (normalizedUser) {
      localStorage.setItem('userData', JSON.stringify(normalizedUser));
      localStorage.setItem('isAuthenticated', 'true');
    }
  };

  // Logout function
  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  // Check if user is admin
  const isAdmin = () => {
    // Get the role name, accounting for both rolename and roleName fields
    const role = (user?.rolename || user?.roleName || '').toLowerCase();
    return role === 'admin';
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 