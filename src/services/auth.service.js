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
      
      // Check cookies after login
      AuthService.checkCookieStatus();
      
      // If login was successful
      if (response && response.message && response.message.includes("thành công")) {
        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        
        // Kiểm tra và lưu token nếu nhận được từ response
        if (response.accessToken) {
          localStorage.setItem('access_token', response.accessToken);
          console.log("Stored access token in localStorage");
        }
        
        try {
          // After login, fetch user data
          const userData = await api.get('/User/me');
          console.log("User data response:", userData);
          
          if (userData) {
            // Store user data
            localStorage.setItem('userData', JSON.stringify(userData));
            
            return {
              success: true,
              message: response.message,
              user: userData
            };
          }
        } catch (userError) {
          console.error('Failed to fetch user data:', userError);
          
          // For now, create a minimal user object from credentials
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
      localStorage.removeItem('access_token');
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
    // Check cookie status to detect issues
    AuthService.checkCookieStatus();
    return localStorage.getItem('isAuthenticated') === 'true' && 
           (document.cookie.length > 0 || localStorage.getItem('access_token'));
  },

  // Get auth error if any
  getAuthError: () => {
    return localStorage.getItem('authError');
  },
  
  // Clear auth error
  clearAuthError: () => {
    localStorage.removeItem('authError');
  },
  
  // Debug cookie status
  checkCookieStatus: () => {
    console.log("Cookie status check:");
    console.log("- Document cookies exist:", document.cookie.length > 0);
    console.log("- Cookie same-site policy:", document.cookie.includes("SameSite=") ? "Specified in cookie" : "Not specified (browser default)");
    console.log("- Cookie secure flag:", document.cookie.includes("Secure") ? "Yes" : "No");
    console.log("- All cookies:", document.cookie);
    
    // Also check localStorage backup
    console.log("- IsAuthenticated in localStorage:", localStorage.getItem('isAuthenticated'));
    console.log("- UserData in localStorage:", !!localStorage.getItem('userData'));
    console.log("- Access token in localStorage:", !!localStorage.getItem('access_token'));
    
    // Try to make a test request to check cookies
    if (navigator.onLine) {
      api.get('/User/me')
        .then(() => console.log("- API test with cookies: Success"))
        .catch(err => console.log("- API test with cookies: Failed", err.message));
    }
  }
};

export default AuthService; 