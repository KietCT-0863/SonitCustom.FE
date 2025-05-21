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
      if (AuthService.isAuthenticated()) {
        try {
          // First try to get user from localStorage
          const storedUser = AuthService.getCurrentUser();
          if (storedUser) {
            // Ensure roleName exists in the user object
            if (!storedUser.roleName) {
              storedUser.roleName = storedUser.username.toLowerCase() === 'admin' ? 'admin' : 'member';
            }
            
            setUser(storedUser);
            setLoading(false);
            
            // Still try to refresh user data in the background if we have a token
            const token = localStorage.getItem('token');
            if (token) {
              try {
                const userData = await api.get('/User/me');
                // Only update if we got valid data
                if (userData && userData.username) {
                  // Ensure roleName exists
                  if (!userData.roleName) {
                    userData.roleName = userData.username.toLowerCase() === 'admin' ? 'admin' : 'member';
                  }
                  
                  setUser(userData);
                  // Update localStorage for future use
                  localStorage.setItem('userData', JSON.stringify(userData));
                }
              } catch (refreshError) {
                console.log('Background user refresh failed:', refreshError);
                // Don't logout - we'll keep using the stored user data
              }
            }
            return;
          }
          
          // If no user in localStorage but authenticated, fetch from API
          const userData = await api.get('/User/me');
          
          // Ensure roleName exists
          if (!userData.roleName) {
            userData.roleName = userData.username.toLowerCase() === 'admin' ? 'admin' : 'member';
          }
          
          setUser(userData);
          // Store in localStorage for future use
          localStorage.setItem('userData', JSON.stringify(userData));
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // Clear auth if user fetch fails
          AuthService.logout();
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = (userData) => {
    // Ensure roleName exists
    if (!userData.roleName) {
      userData.roleName = userData.username.toLowerCase() === 'admin' ? 'admin' : 'member';
    }
    
    setUser(userData);
    // Also update localStorage
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  };

  // Logout function
  const logout = () => {
    AuthService.logout();
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