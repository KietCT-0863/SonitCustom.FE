import React, { useState, useEffect } from 'react';
import './styles.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <img src="/logo.png" alt="Exceed Logo" className="logo" />
      <nav className="nav-links">
        <a href="/">CUES</a>
        <a href="/shafts">SHAFTS</a>
        <a href="/accessories">ACCESSORIES</a>
        <a href="/cases">CASES</a>
        <a href="/technology">TECHNOLOGY</a>
        <a href="/dealers">FIND A DEALER</a>
      </nav>
      <div className="language-social">
        <a href="/japanese">Japanese</a>
        <a href="/english">English</a>
        <div className="social-icons">
          <span>FB</span>
          <span>IG</span>
          <span>YT</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 