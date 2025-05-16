import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Giả lập thời gian xử lý
    setTimeout(() => {
      console.log('Login attempt with:', formData);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="login-page">
      <div className="particles"></div>
      
      <Link to="/" className="back-to-home">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back to Home</span>
      </Link>
      
      <div className="login-card">
        <div className="login-card-inner">
          <div className="login-header">
            <div className="login-logo">
              <div className="logo-circle">SC</div>
            </div>
            <h1>Welcome Back</h1>
            <p>Enter your credentials to access your account</p>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className={`form-floating ${isEmailFocused || formData.email ? 'focused' : ''}`}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                required
              />
              <label htmlFor="email">Email Address</label>
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
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <div className="divider">
              <span>or</span>
            </div>
            
            <div className="social-buttons">
              <button type="button" className="social-button google">
                <span className="social-icon">G</span>
              </button>
              <button type="button" className="social-button facebook">
                <span className="social-icon">f</span>
              </button>
              <button type="button" className="social-button apple">
                <span className="social-icon">a</span>
              </button>
            </div>
            
            <p className="signup-text">
              Don't have an account? 
              <Link to="/register" className="register-link"> Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 