import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

const Logo = ({ 
  size = 'medium', 
  animated = true, 
  linkTo = '/',
  showText = true
}) => {
  const sizeClass = `logo-${size}`;
  const animationClass = animated ? 'logo-animated' : '';
  
  const LogoContent = () => (
    <div className={`logo-container ${sizeClass} ${animationClass}`}>
      <div className="logo-inner">
        <div className="logo-circle"></div>
        <span className="logo-text">SC</span>
        <div className="logo-shine"></div>
        <div className="logo-pulse"></div>
      </div>
      {showText && <div className="logo-name">SONIT CUSTOM</div>}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="logo-link" aria-label="Về trang chủ">
        <LogoContent />
      </Link>
    );
  } else {
    return <LogoContent />;
  }
};

export default Logo; 