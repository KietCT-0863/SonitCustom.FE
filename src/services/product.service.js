import api from '../config/api.config';
import axios from 'axios';

// Biến theo dõi refresh token để tránh gọi nhiều lần
let isRefreshingToken = false;
let refreshTokenPromise = null;

// Backend API URL
const API_URL = 'https://sonitcustom-be.onrender.com/api';

// Create a separate axios instance for external API with the specific backend URL
const externalApi = axios.create({
  baseURL: API_URL,
  timeout: 15000, // Tăng timeout lên 15 giây
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // Enable sending cookies with cross-origin requests
});

// Hàm để refresh token
const refreshAuthToken = async () => {
  if (isRefreshingToken) {
    return refreshTokenPromise;
  }

  isRefreshingToken = true;
  refreshTokenPromise = new Promise(async (resolve, reject) => {
    try {
      console.log("Đang thực hiện refresh token...");
      // Gọi API refresh token
      const response = await axios.post(`${API_URL}/Auth/refresh`, {}, {
        withCredentials: true
      });
      
      console.log("Refresh token thành công");
      localStorage.setItem('isAuthenticated', 'true');
      resolve(true);
    } catch (error) {
      console.error("Refresh token thất bại:", error);
      localStorage.removeItem('isAuthenticated');
      reject(error);
    } finally {
      isRefreshingToken = false;
    }
  });

  return refreshTokenPromise;
};

// Request interceptor
externalApi.interceptors.request.use(
  (config) => {
    // Thêm timestamp vào request để tránh cache
    config.params = {
      ...config.params,
      _t: Date.now()
    };

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
externalApi.interceptors.response.use(
  (response) => {
    // Nếu có phản hồi thành công, cập nhật trạng thái xác thực
    localStorage.setItem('isAuthenticated', 'true');
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Nếu lỗi là unauthorized và chưa thử refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Thử refresh token
        await refreshAuthToken();
        
        // Thử lại request ban đầu
        return externalApi(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại, xóa trạng thái đăng nhập
        localStorage.removeItem('isAuthenticated');
        
        // Chuyển hướng đến trang đăng nhập nếu đang ở trang admin
        if (window.location.pathname.includes('/admin')) {
          localStorage.setItem('redirectAfterLogin', window.location.pathname);
          window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
          return Promise.reject({ message: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.' });
        }
      }
    }
    
    // Xử lý lỗi mạng
    if (error.code === 'ERR_NETWORK') {
      console.error('Lỗi kết nối mạng:', error.message);
      return Promise.reject({ 
        message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.' 
      });
    }
    
    // Xử lý các lỗi khác
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    
    return Promise.reject(error);
  }
);

const ProductService = {
  // Get all products
  getProducts: async () => {
    try {
      const response = await externalApi.get('/Product');
      return response;
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await externalApi.get(`/Product/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create a new product
  createProduct: async (productData) => {
    try {
      // Validate required fields
      if (!productData.proName) throw new Error('Tên sản phẩm không được để trống');
      if (!productData.description) throw new Error('Mô tả không được để trống');
      if (!productData.imgUrl) throw new Error('URL hình ảnh không được để trống');
      if (productData.price < 0) throw new Error('Giá không được âm');
      if (!productData.category) throw new Error('Danh mục không được để trống');
      
      // Log thông tin gửi đi để debug
      console.log('Dữ liệu tạo sản phẩm:', {
        proName: productData.proName,
        description: productData.description,
        imgUrl: productData.imgUrl,
        price: productData.price,
        category: parseInt(productData.category)
      });
      
      const response = await externalApi.post('/Product', {
        proName: productData.proName,
        description: productData.description,
        imgUrl: productData.imgUrl,
        price: productData.price,
        category: parseInt(productData.category)
      });
      
      console.log('Kết quả tạo sản phẩm:', response);
      return response;
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      throw error;
    }
  },

  // Update an existing product
  updateProduct: async (productId, productData) => {
    try {
      if (!productId) {
        throw new Error('ID sản phẩm là bắt buộc để cập nhật');
      }
      
      // Chỉ gửi những trường đã thay đổi, loại bỏ các trường null
      const updateRequest = {};
      
      // Chỉ thêm vào request những trường có giá trị không null
      if (productData.proName !== null) updateRequest.proName = productData.proName;
      if (productData.description !== null) updateRequest.description = productData.description;
      if (productData.imgUrl !== null) updateRequest.imgUrl = productData.imgUrl;
      if (productData.price !== null) updateRequest.price = productData.price;
      if (productData.category !== null) updateRequest.category = parseInt(productData.category);
      if (productData.isCustom !== null) updateRequest.isCustom = productData.isCustom;
      
      // Log thông tin gửi đi để debug
      console.log(`Cập nhật sản phẩm ID ${productId}:`, updateRequest);
      
      // Đảm bảo có ít nhất một trường được cập nhật
      if (Object.keys(updateRequest).length === 0) {
        throw new Error('Không có dữ liệu nào được thay đổi để cập nhật');
      }
      
      const response = await externalApi.put(`/Product/${productId}`, updateRequest);
      console.log('Kết quả cập nhật:', response);
      return response;
    } catch (error) {
      console.error(`Lỗi khi cập nhật sản phẩm ${productId}:`, error);
      throw error;
    }
  },

  // Delete a product
  deleteProduct: async (productId) => {
    try {
      if (!productId) {
        throw new Error('ID sản phẩm là bắt buộc để xóa');
      }
      
      console.log(`Xóa sản phẩm ID ${productId}`);
      const response = await externalApi.delete(`/Product/${productId}`);
      console.log('Kết quả xóa:', response);
      return response;
    } catch (error) {
      console.error(`Lỗi khi xóa sản phẩm ${productId}:`, error);
      throw error;
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await externalApi.get('/Category');
      return response;
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await externalApi.get(`/Product/category/${category}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Search products
  searchProducts: async (query, params = {}) => {
    try {
      const response = await api.get('/products/search', {
        params: { ...params, q: query }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get related products
  getRelatedProducts: async (productId, limit = 4) => {
    try {
      const response = await api.get(`/products/${productId}/related`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Check authentication status
  checkAuthStatus: async () => {
    try {
      // Try to access a protected resource to check auth status
      await externalApi.get('/Category');
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          // Try to refresh token
          await refreshAuthToken();
          return true;
        } catch (refreshError) {
          localStorage.removeItem('isAuthenticated');
          return false;
        }
      }
      // For other errors, assume authentication is still valid if previously set
      return localStorage.getItem('isAuthenticated') === 'true';
    }
  },

  // Explicit logout
  logout: async () => {
    try {
      await externalApi.post('/Auth/logout');
      localStorage.removeItem('isAuthenticated');
      return true;
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      // Still remove auth state even if API call fails
      localStorage.removeItem('isAuthenticated');
      return false;
    }
  }
};

export default ProductService; 