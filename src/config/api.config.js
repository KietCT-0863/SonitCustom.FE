import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://sonitcustom-be.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response.data;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        // Clear token but don't force redirect
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        // Store auth error instead of redirecting
        localStorage.setItem('authError', 'Session expired. Please log in again.');
      }
      
      // Handle other errors
      return Promise.reject(error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default api; 