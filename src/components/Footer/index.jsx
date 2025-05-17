import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://www.facebook.com/groups/2648184928799088"></a>
        <a href="https://instagram.com"></a>
        <a href="https://youtube.com"></a>
        <a href="https://twitter.com"></a>
        <a href="https://tiktok.com"></a>
      </div>
      <div className="footer-logo">
        <Logo size="large" animated={true} linkTo="/" />
      </div>
      <p className="slogan font-effect-outline">BORN TO PERFORM</p>
      <p className="copyright">© 2025 Sonic Custom. All rights reserved.</p>
    </footer>
  );
};

export default Footer;