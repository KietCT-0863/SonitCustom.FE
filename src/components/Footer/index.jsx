import React from 'react';
import './styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://facebook.com">FB</a>
        <a href="https://instagram.com">IG</a>
        <a href="https://youtube.com">YT</a>
        <a href="https://twitter.com">TW</a>
        <a href="https://tiktok.com">TT</a>
      </div>
      <img src="/logo.png" alt="Exceed Logo" className="logo" />
      <p className="slogan font-effect-outline">BORN TO PERFORM</p>
      <p className="copyright">Copyright EXCEED CO., LTD. All rights reserved.</p>
    </footer>
  );
};

export default Footer;