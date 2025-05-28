import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://sonitcustom-be.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // Quan trọng: Đảm bảo cookies được gửi với mọi request
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Chỉ trả về data từ response
    return response.data;
  },
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error connecting to API:', error.message);
      return Promise.reject({ message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.' });
    }
    
    if (error.response) {
      // Xử lý lỗi 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.setItem('authError', 'Session expired. Please log in again.');
        
        // Xoá thông tin đăng nhập trong localStorage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
      }
      
      return Promise.reject(error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default api; 