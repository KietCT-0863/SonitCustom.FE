import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

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
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle registration logic here
      console.log('Registration attempt with:', formData);
    }
  };
  
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join Sonit Custom and explore our premium products</p>
        </div>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          
          <div className="form-group terms">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeTerms">
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>
          </div>
          
          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>
        
        <div className="register-footer">
          <p>
            Already have an account? 
            <Link to="/login" className="login-link"> Sign in</Link>
          </p>
        </div>
      </div>
      
      <div className="register-image">
        <img src="/assets/register-image.jpg" alt="Register" />
      </div>
    </div>
  );
};

export default RegisterPage; 