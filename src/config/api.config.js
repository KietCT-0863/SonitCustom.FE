import axios from "axios";

// API URL cho backend
const API_URL = "https://sonitcustom-be.onrender.com/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Thêm timestamp vào request để tránh cache
    config.params = {
      ...config.params,
      _t: Date.now(),
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Nếu response thành công, đánh dấu đã xác thực
    localStorage.setItem("isAuthenticated", "true");
    return response.data;
  },
  async (error) => {
    // Xử lý lỗi mạng
    if (error.code === "ERR_NETWORK") {
      console.error("Lỗi kết nối mạng:", error.message);
      return Promise.reject({
        message:
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.",
      });
    }

    if (error.response) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;
