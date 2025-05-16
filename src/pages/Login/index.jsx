import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', formData);
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Sign In</h1>
          <p>Welcome back! Please enter your details</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>
          
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            Don't have an account? 
            <Link to="/register" className="register-link"> Create an account</Link>
          </p>
        </div>
      </div>
      
      <div className="login-image">
        <img src="/assets/login-image.jpg" alt="Login" />
      </div>
    </div>
  );
};

export default LoginPage; 