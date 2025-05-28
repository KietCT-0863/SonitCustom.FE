import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../config/api.config';
import AuthService from '../services/auth.service';

// Create context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info on mount if authenticated
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking authentication status on page load/refresh");
      
      // Attempt to restore session even if cookies might be lost
      const storedUser = AuthService.getCurrentUser();
      const isAuthInStorage = localStorage.getItem('isAuthenticated') === 'true';
      
      if (isAuthInStorage && storedUser) {
        console.log("Found auth data in localStorage, setting user state");
        setUser(storedUser);
        setLoading(false);
        
        // Try to validate the session with the backend
        if (navigator.onLine) {
          try {
            console.log("Attempting to validate session with backend");
            const userData = await api.get('/User/me');
            
            if (userData && userData.username) {
              console.log("Session is valid, updating user data");
              setUser(userData);
              localStorage.setItem('userData', JSON.stringify(userData));
              localStorage.setItem('isAuthenticated', 'true');
            } else {
              console.log("Failed to get valid user data");
            }
          } catch (error) {
            console.error("Session validation failed:", error);
            
            if (error.code === 'ERR_NETWORK') {
              console.warn('Network error detected - maintaining session state');
              // Keep existing user data
            } else if (error.status === 401) {
              console.log("Session expired, need to login again");
              // Try silent refresh if using refresh tokens
              try {
                // This assumes your backend has an endpoint for refreshing tokens
                await api.post('/Auth/refresh');
                // If successful, try getting user data again
                const userData = await api.get('/User/me');
                if (userData && userData.username) {
                  setUser(userData);
                  localStorage.setItem('userData', JSON.stringify(userData));
                  localStorage.setItem('isAuthenticated', 'true');
                }
              } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                // Clear auth since refresh failed
                await AuthService.logout();
                setUser(null);
              }
            } else {
              await AuthService.logout();
              setUser(null);
            }
          }
        }
      } else {
        console.log("No auth data found in localStorage");
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    // Also update localStorage
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
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
    return user?.roleName === 'admin';
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