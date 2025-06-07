import axios from "axios";

// API URL cho backend
const API_URL = "https://sonitcustom-be.onrender.com/api";

// Biến theo dõi trạng thái refresh token
let isRefreshingToken = false;
let refreshPromise = null;
let failedQueue = [];

// Process failed requests queue
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

// Hàm refresh token
const refreshToken = async () => {
  if (isRefreshingToken) {
    return refreshPromise;
  }

  isRefreshingToken = true;
  console.log("Đang thực hiện refresh token...");

  refreshPromise = new Promise(async (resolve, reject) => {
    try {
      // Cập nhật endpoint cho refresh token
      const response = await axios.post(
        `${API_URL}/Auth/refresh-token`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log("Refresh token thành công");
      localStorage.setItem("isAuthenticated", "true");

      // Đặt timeout cho isRefreshingToken để tránh spam
      setTimeout(() => {
        isRefreshingToken = false;
      }, 5000);

      processQueue(null);
      resolve(true);
    } catch (error) {
      console.error("Refresh token thất bại:", error);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userData");
      isRefreshingToken = false;

      processQueue(error);
      reject(error);
    }
  });

  return refreshPromise;
};

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000, // Tăng timeout lên 15 giây
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Quan trọng: Đảm bảo cookies được gửi với mọi request
  // Thêm cấu hình cho iOS
  validateStatus: function (status) {
    return status >= 200 && status < 500; // Chấp nhận tất cả status code từ 200-499
  },
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

    // Chỉ trả về data từ response
    return response.data;
  },
  async (error) => {
    // Lưu lại request ban đầu
    const originalRequest = error.config;

    // Xử lý lỗi mạng
    if (error.code === "ERR_NETWORK") {
      console.error("Lỗi kết nối mạng:", error.message);
      return Promise.reject({
        message:
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.",
      });
    }

    if (error.response) {
      // Xử lý lỗi 401 Unauthorized và thử refresh token
      if (error.response.status === 401 && !originalRequest._retry) {
        console.log("Phát hiện lỗi 401, thử refresh token");

        if (isRefreshingToken) {
          // If token refresh is already in progress, add this request to queue
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              // Retry original request after refresh is complete
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        // Đánh dấu request này đã được thử refresh để tránh loop
        originalRequest._retry = true;

        try {
          // Thử refresh token
          await refreshToken();

          // Nếu refresh thành công, thử lại request ban đầu
          console.log("Refresh token thành công, thử lại request ban đầu");
          return api(originalRequest);
        } catch (refreshError) {
          // Nếu refresh thất bại, xóa thông tin đăng nhập
          console.log("Refresh token thất bại, đăng xuất");
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userData");

          // Kiểm tra nếu đang ở trang admin thì chuyển hướng về login
          if (window.location.pathname.includes("/admin")) {
            localStorage.setItem(
              "redirectAfterLogin",
              window.location.pathname
            );
            setTimeout(() => {
              window.location.href =
                "/login?redirect=" +
                encodeURIComponent(window.location.pathname);
            }, 500);
          }

          return Promise.reject({
            message: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.",
          });
        }
      }

      // Các lỗi khác thì trả về response data
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;
