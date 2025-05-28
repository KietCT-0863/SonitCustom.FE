import axios from 'axios';
import Cookies from 'js-cookie';

// Tạo biến để theo dõi trạng thái cookie
let useTokenFallback = false;
let lastTokenCheck = 0;
const TOKEN_CHECK_INTERVAL = 30000; // 30 giây

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://sonitcustom-be.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const now = Date.now();

    // Kiểm tra nếu cookies thất bại thì dùng token từ localStorage
    if (useTokenFallback || now - lastTokenCheck > TOKEN_CHECK_INTERVAL) {
      const accessToken = localStorage.getItem('access_token');
      
      // Nếu không có cookie nhưng có token trong localStorage, thêm token vào header
      if (accessToken && (useTokenFallback || document.cookie.length === 0)) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        useTokenFallback = true;
        console.log("Using token fallback from localStorage");
      }
      
      lastTokenCheck = now;
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
    // Kiểm tra nếu response có token mới, lưu vào localStorage để dự phòng
    if (response.data && response.data.accessToken) {
      localStorage.setItem('access_token', response.data.accessToken);
      console.log("Saved new access token to localStorage");
    }

    return response.data;
  },
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error connecting to API:', error.message);
      return Promise.reject({ message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.' });
    }
    
    if (error.response) {
      // Lưu thông tin về lỗi cho case refresh token không còn hợp lệ
      if (error.response.status === 401) {
        localStorage.setItem('authError', 'Session expired. Please log in again.');
        
        // Kiểm tra xem đã thử dùng token dự phòng chưa
        if (!useTokenFallback) {
          // Thử dùng token dự phòng nếu có
          const accessToken = localStorage.getItem('access_token');
          if (accessToken) {
            useTokenFallback = true;
            console.log("Auth failed, trying fallback token");
            
            // Clone và thử lại request với token dự phòng
            const originalRequest = error.config;
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return axios(originalRequest);
          }
        }
        
        // Nếu đã thử dự phòng hoặc không có token dự phòng, xoá dữ liệu
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        localStorage.removeItem('access_token');
      }
      
      return Promise.reject(error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default api; 