import api from '../config/api.config';

const AuthService = {
  // Helper function to normalize role name access
  normalizeUserData: (userData) => {
    if (!userData) return null;
    
    // Create a standardized user object that handles both formats
    return {
      ...userData,
      // Use rolename from backend or fallback to roleName, ensure lowercase
      roleName: (userData.rolename || userData.roleName || userData.role || '').toLowerCase()
    };
  },

  // Login user
  login: async (credentials) => {
    try {
      // Clear any previous auth errors
      localStorage.removeItem('authError');
      
      const response = await api.post('/Auth/login', {
        username: credentials.username,
        password: credentials.password
      });
      
      console.log("Login response:", response);
      
      // If login was successful
      if (response && response.message && response.message.includes("thành công")) {
        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        
        // Store user data if available in the response
        if (response.user) {
          const normalizedUser = AuthService.normalizeUserData(response.user);
          localStorage.setItem('userData', JSON.stringify(normalizedUser));
          
          return {
            success: true,
            message: response.message,
            user: normalizedUser
          };
        }
        
        try {
          // If user data wasn't in login response, try to fetch it
          const userData = await api.get('/User/me');
          console.log("User data response:", userData);
          
          if (userData) {
            // Normalize user data to handle both rolename and roleName
            const normalizedUser = AuthService.normalizeUserData(userData);
            
            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify(normalizedUser));
            
            return {
              success: true,
              message: response.message,
              user: normalizedUser
            };
          }
        } catch (userError) {
          console.error('Failed to fetch user data:', userError);
          
          // For demo purposes only - in production, we should require proper user data
          const minimalUser = {
            username: credentials.username,
            // Ensure roleName is lowercase for consistent comparison
            roleName: credentials.username.toLowerCase() === 'admin' ? 'admin' : 'member'
          };
          
          console.log('Using fallback user data:', minimalUser);
          
          // Store minimal user data
          localStorage.setItem('userData', JSON.stringify(minimalUser));
          
          return {
            success: true,
            message: response.message,
            user: minimalUser
          };
        }
      }
      
      // If we got here without returning, the login was not successful
      return {
        success: false,
        message: response.message || "Đăng nhập thất bại"
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || "Có lỗi xảy ra khi đăng nhập"
      };
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/Register', userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Verify auth token
  verifyToken: async () => {
    try {
      // First check if we have authentication state in localStorage
      if (!localStorage.getItem('isAuthenticated')) {
        console.log('No authentication state found in localStorage');
        return false;
      }
      
      // Try to make a simple API call that requires authentication
      // If it succeeds, the token is valid
      // If it fails with 401, the token is invalid
      const response = await api.get('/User/me');
      console.log('Token verification succeeded via /User/me', response);
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      
      // If the error is a 401, the token is invalid
      if (error.response && error.response.status === 401) {
        // Clear auth state since token is invalid
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
      }
      
      return false;
    }
  },

  // Logout user
  logout: async () => {
    try {
      // Only attempt API call if we're likely connected
      if (navigator.onLine) {
        // Call the backend logout endpoint to invalidate the refresh token
        await api.post('/Auth/logout').catch(err => {
          console.error('Error during logout API call:', err);
          // Continue with local logout regardless
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Always clear local state regardless of API call success
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userData');
      localStorage.removeItem('authError');
    }
  },

  // Get current user data
  getCurrentUser: () => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        // Normalize user data to handle both rolename and roleName
        return AuthService.normalizeUserData(parsedUser);
      }
      return null;
    } catch (error) {
      console.error('Failed to get user data from localStorage:', error);
      return null;
    }
  },

  // Check if user is authenticated locally
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  // Get auth error if any
  getAuthError: () => {
    return localStorage.getItem('authError');
  },
  
  // Clear auth error
  clearAuthError: () => {
    localStorage.removeItem('authError');
  }
};

export default AuthService; 