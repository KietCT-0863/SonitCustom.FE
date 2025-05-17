import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInputs, setFocusedInputs] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  
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
  
  const handleFocus = (name) => {
    setFocusedInputs(prev => ({
      ...prev,
      [name]: true
    }));
  };
  
  const handleBlur = (name) => {
    setFocusedInputs(prev => ({
      ...prev,
      [name]: false
    }));
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear password error when password fields change
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };
  
  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Mật khẩu không khớp');
      return false;
    }
    
    if (formData.password.length < 8) {
      setPasswordError('Mật khẩu phải có ít nhất 8 ký tự');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Giả lập thời gian xử lý
      setTimeout(() => {
        console.log('Registration attempt with:', formData);
        setIsLoading(false);
      }, 1500);
    }
  };
  
  return (
    <div className="register-page">
      <div className="particles"></div>
      
      <Link to="/" className="back-to-home">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back to Home</span>
      </Link>
      
      <div className="register-card">
        <div className="register-card-inner">
          <div className="register-header">
            <div className="register-logo">
            <img 
            src="/assets/images/logo.jpg" 
      className='register-logo-image'
  
          />
            </div>
            <h1>Create Account</h1>
            <p>Join Sonit Custom and explore our premium products</p>
          </div>
          
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className={`form-floating ${focusedInputs.firstName || formData.firstName ? 'focused' : ''}`}>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder=" "
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={() => handleFocus('firstName')}
                  onBlur={() => handleBlur('firstName')}
                  required
                />
                <label htmlFor="firstName">First Name</label>
                <div className="input-highlight"></div>
              </div>
              
              <div className={`form-floating ${focusedInputs.lastName || formData.lastName ? 'focused' : ''}`}>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder=" "
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={() => handleFocus('lastName')}
                  onBlur={() => handleBlur('lastName')}
                  required
                />
                <label htmlFor="lastName">Last Name</label>
                <div className="input-highlight"></div>
              </div>
            </div>
            
            <div className={`form-floating ${focusedInputs.email || formData.email ? 'focused' : ''}`}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                required
              />
              <label htmlFor="email">Email Address</label>
              <div className="input-highlight"></div>
            </div>
            
            <div className={`form-floating ${focusedInputs.password || formData.password ? 'focused' : ''}`}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                required
              />
              <label htmlFor="password">Password</label>
              <div className="input-highlight"></div>
            </div>
            
            <div className={`form-floating ${focusedInputs.confirmPassword || formData.confirmPassword ? 'focused' : ''}`}>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder=" "
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => handleFocus('confirmPassword')}
                onBlur={() => handleBlur('confirmPassword')}
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-highlight"></div>
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            
            <div className="terms">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">
                  I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                </span>
              </label>
            </div>
            
            <button 
              type="submit" 
              className={`register-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="register-footer">
            <div className="divider">
              <span>or</span>
            </div>
            
            <div className="social-buttons">
              <button type="button" className="social-button google">
                <FaGoogle />
              </button>
              <button type="button" className="social-button facebook">
                <FaFacebook />
              </button>
              <button type="button" className="social-button apple">
                <FaApple />
              </button>
            </div>
            
            <p className="signin-text">
              Already have an account?
              <Link to="/login" className="login-link"> Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 