import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import { useUser } from '../../contexts/UserContext';
import './styles.css';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import Cookies from 'js-cookie';

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
  
  // Test cookie functionality
  useEffect(() => {
    // Test if cookies are working
    const testCookieStorage = () => {
      try {
        // Try to set a test cookie
        Cookies.set('test_cookie', 'test_value', { path: '/' });
        const testCookie = Cookies.get('test_cookie');
        
        console.log('Cookie test result:', testCookie ? 'Cookies are working' : 'Cookies failed');
        
        // Clean up
        Cookies.remove('test_cookie', { path: '/' });
      } catch (error) {
        console.error('Cookie test error:', error);
      }
    };
    
    testCookieStorage();
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
    
    try {
      const response = await AuthService.login(formData);
      console.log("Login response:", response);
      
      if (response.success) {
        // Show success message
        setSuccess(response.message);
        
        // Check if token was set properly
        const token = Cookies.get('jwt_token');
        console.log("Token in cookies after login:", token ? "Token exists" : "No token found");
        
        // Inspect localStorage as fallback
        const localToken = localStorage.getItem('jwt_token');
        console.log("Token in localStorage after login:", localToken ? "Token exists" : "No token found");
        
        // Update user context if user data is available
        if (response.user) {
          console.log("Setting user in context:", response.user);
          userContextLogin(response.user);
          
          // Navigate to home page - no need for setTimeout
          navigate('/', { replace: true });
        } else {
          console.log("No user data returned, attempting to navigate anyway");
          // If no user data, try to navigate after a brief delay
          // This gives the context time to update if needed
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 100);
        }
      } else {
        console.log("Login failed:", response.message);
        setError(response.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('Có lỗi xảy ra khi đăng nhập');
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
            
            <div className="social-buttons">
              <button 
                type="button" 
                className="social-button google"
                aria-label="Sign in with Google"
                title="Sign in with Google"
              >
                <FaGoogle aria-hidden="true" />
              </button>
              <button 
                type="button" 
                className="social-button facebook"
                aria-label="Sign in with Facebook"
                title="Sign in with Facebook"
              >
                <FaFacebook aria-hidden="true" />
              </button>
              <button 
                type="button" 
                className="social-button apple"
                aria-label="Sign in with Apple"
                title="Sign in with Apple"
              >
                <FaApple aria-hidden="true" />
              </button>
            </div>
            
            <p className="signup-text">
              Don't have an account ? 
              <Link to="/register" className="register-link"> Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 