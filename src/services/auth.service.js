import api from '../config/api.config';

const AuthService = {
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
        
        try {
          // After login, fetch user data
          const userData = await api.get('/User/me');
          console.log("User data response:", userData);
          
          if (userData) {
            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            
            return {
              success: true,
              message: response.message,
              user: userData
            };
          }
        } catch (userError) {
          console.error('Failed to fetch user data:', userError);
          
          // For demo purposes only - in production, we should require proper user data
          const minimalUser = {
            username: credentials.username,
            roleName: credentials.username.toLowerCase() === 'admin' ? 'admin' : 'member'
          };
          
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
      const response = await api.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw error;
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
        return JSON.parse(userData);
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