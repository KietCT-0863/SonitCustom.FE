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
      
      console.log("Raw API login response:", response);
      
      // Check if login was successful based on message
      if (response.message && response.message.includes("thành công")) {
        // Store auth data 
        localStorage.setItem('isAuthenticated', 'true');
        
        // Determine roleName based on the username or API response
        // Mặc định roleName là admin nếu username là admin, ngược lại là member
        const roleFromUsername = credentials.username.toLowerCase() === 'admin' ? 'admin' : 'member';
        const roleName = response.roleName || roleFromUsername;
        
        // Store token if available
        if (response.token) {
          localStorage.setItem('token', response.token);
          
          // Fetch user data after token is set
          try {
            // Create a small delay to ensure token is properly set
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Fetch user data with the new token
            const userData = await api.get('/User/me');
            console.log("User data response:", userData);
            
            // Đảm bảo roleName tồn tại trong userData
            if (!userData.roleName) {
              userData.roleName = roleName;
            }
            
            // Store user data
            localStorage.setItem('userData', JSON.stringify(userData));
            
            return {
              success: true,
              message: response.message,
              user: userData
            };
          } catch (userError) {
            console.error('Failed to fetch user data:', userError);
            
            // For now, create a minimal user object from credentials
            const minimalUser = {
              username: credentials.username,
              fullname: credentials.username || 'User', // Fallback name
              roleName: roleName // Thêm roleName vào đây
            };
            
            // Store minimal user data
            localStorage.setItem('userData', JSON.stringify(minimalUser));
            
            return {
              success: true,
              message: response.message,
              user: minimalUser
            };
          }
        } else {
          // If no token but login successful, create minimal user
          const minimalUser = {
            username: credentials.username,
            fullname: credentials.username || 'User', // Fallback name
            roleName: roleName // Thêm roleName vào đây
          };
          
          // Store minimal user data
          localStorage.setItem('userData', JSON.stringify(minimalUser));
          
          return {
            success: true,
            message: response.message,
            user: minimalUser
          };
        }
      } else {
        return {
          success: false,
          message: response.message || "Đăng nhập thất bại"
        };
      }
    } catch (error) {
      // Handle network errors or other exceptions
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
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('authError');
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

  // Check if user is authenticated
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