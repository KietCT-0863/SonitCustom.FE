import React from 'react';
import Logo from '../Logo/Logo';
import './styles.css';

const LoadingSpinner = ({ message = "Đang tải..." }) => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-logo-wrapper">
        <Logo size="medium" animated={true} linkTo={null} showText={false} />
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner; 