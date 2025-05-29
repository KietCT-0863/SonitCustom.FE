import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import { useUser } from '../../contexts/UserContext';
import './styles.css';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: userContextLogin, user } = useUser();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [cookieStatus, setCookieStatus] = useState({
    enabled: true,
    tested: false
  });
  
  // Test cookie functionality
  useEffect(() => {
    const testCookies = () => {
      try {
        // Try to set a test cookie
        document.cookie = "cookie_test=1; path=/; SameSite=Lax";
        const cookiesEnabled = document.cookie.indexOf("cookie_test") !== -1;
        
        // Clear the test cookie
        document.cookie = "cookie_test=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        console.log("Cookie test result:", cookiesEnabled ? "Cookies are working" : "Cookies are disabled");
        setCookieStatus({
          enabled: cookiesEnabled,
          tested: true
        });
      } catch (error) {
        console.error("Cookie test error:", error);
        setCookieStatus({
          enabled: false,
          tested: true
        });
      }
    };
    
    // Run test after a short delay to ensure page is fully loaded
    setTimeout(testCookies, 1000);
  }, []);
  
  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsConnected(true);
    const handleOffline = () => setIsConnected(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Check for auth errors on mount
  useEffect(() => {
    const authError = AuthService.getAuthError();
    if (authError) {
      setError(authError);
      AuthService.clearAuthError();
    }
  }, []);
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);
  
  // Hiệu ứng hạt sáng cho nền
  useEffect(() => {
    const createParticles = () => {
      const particles = document.querySelector('.particles');
      if (!particles) return;
      
      particles.innerHTML = '';
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Vị trí ngẫu nhiên
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Kích thước ngẫu nhiên
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Độ trễ animation ngẫu nhiên
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particles.appendChild(particle);
      }
    };
    
    createParticles();
    
    // Tái tạo particles khi resize cửa sổ
    window.addEventListener('resize', createParticles);
    return () => {
      window.removeEventListener('resize', createParticles);
    };
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    // Check if we're online before trying to login
    if (!navigator.onLine) {
      setError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.');
      setIsLoading(false);
      return;
    }
    
    // Warn about cookie issues
    if (cookieStatus.tested && !cookieStatus.enabled) {
      console.warn("Cookies are disabled. Login might work but sessions won't persist between page refreshes.");
      // We'll still try to login, as we have the localStorage fallback
    }
    
    try {
      const response = await AuthService.login(formData);
      // console.log("Login response:", response);
      
      if (response.success) {
        // Show success message
        setSuccess(response.message || 'Đăng nhập thành công');
        
        // Update user context if user data is available
        if (response.user) {
          // console.log("Setting user in context:", response.user);
          userContextLogin(response.user);
          
          // Navigate to home page
          navigate('/', { replace: true });
        }
      } else {
        console.log("Login failed:", response.message);
        setError(response.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      console.error("Login error:", err);
      
      // Show a more user-friendly message for network errors
      if (err.code === 'ERR_NETWORK') {
        setError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.');
      } else {
        setError(err.message || 'Có lỗi xảy ra khi đăng nhập');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <div className="particles"></div>
      
      <Link to="/" className="back-to-home">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back to Home</span>
      </Link>
      
      <div className="login-card">
        <div className="login-card-inner">
          <div className="login-header">
            <div className="login-logo">
              <img 
                src="/assets/images/logo.jpg" 
                className='login-logo-image'
                alt="Logo"
              />
            </div>
            <h1>Welcome Back</h1>
            <p>Please sign in to continue</p>
            {!isConnected && (
              <div className="network-warning">
                ⚠️ Không có kết nối mạng. Một số tính năng có thể không hoạt động.
              </div>
            )}
            {cookieStatus.tested && !cookieStatus.enabled && (
              <div className="cookie-warning">
                ⚠️ Cookies bị vô hiệu hóa. Đăng nhập có thể hoạt động nhưng phiên sẽ không được lưu trữ giữa các lần làm mới trang.
              </div>
            )}
          </div>
          
          <div className="login-form-container">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <form onSubmit={handleLogin} noValidate>
              <div className={`form-floating ${isEmailFocused || formData.username ? 'focused' : ''}`}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder=" "
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  required
                />
                <label htmlFor="username">Username</label>
                <div className="input-highlight"></div>
              </div>
              
              <div className={`form-floating ${isPasswordFocused || formData.password ? 'focused' : ''}`}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  required
                />
                <label htmlFor="password">Password</label>
                <div className="input-highlight"></div>
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-label">Remember me</span>
                  </label>
                </div>
                
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>
              
              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
          
          <div className="login-footer">
            <div className="divider">
              <span>or</span>
            </div>
            
            <div className="social-login">
              <button className="social-login-btn google">
                <FaGoogle />
                <span>Sign in with Google</span>
              </button>
              
              <button className="social-login-btn facebook">
                <FaFacebook />
                <span>Sign in with Facebook</span>
              </button>
              
              <button className="social-login-btn apple">
                <FaApple />
                <span>Sign in with Apple</span>
              </button>
            </div>
            
            <div className="register-link">
              Don't have an account? <Link to="/register">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 