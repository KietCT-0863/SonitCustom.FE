import React, { useEffect } from 'react';
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
      <img src="public/assets/logo.jpg" alt="Sonit Custom" className="logo-animated" />
      <p className="slogan font-effect-outline">BORN TO PERFORM</p>
      <p className="copyright">© 2025 Sonic Custom. All rights reserved.</p>
    </footer>
  );
};

export default Footer;