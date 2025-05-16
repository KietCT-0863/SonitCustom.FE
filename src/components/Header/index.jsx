import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

// Dummy translation data (English only)
const headerTranslations = {
  menu: {
    STORE: {
      submenu: [
        { title: 'Cues', desc: 'Explore our premium cues collection' },
        { title: 'Shafts', desc: 'Advanced technology shafts' },
        { title: 'Accessories', desc: 'Premium accessories' },
        { title: 'Cases', desc: 'Protective cases for your equipment' }
      ]
    },
    CATALOGUE: {
      submenu: []
    },
    'ABOUT US': {
      submenu: []
    },
    BLOG: {
      submenu: []
    },
    SUPPORT: {
      submenu: []
    },
    LOGIN: {
      submenu: []
    },
    REGISTER: {
      submenu: []
    }
  }
};


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  
  const menuKeys = ['STORE', 'CATALOGUE', 'ABOUT US', 'BLOG', 'SUPPORT', 'LOGIN', 'REGISTER'];
  const menuItems = menuKeys.map((key, idx) => {
    const path = key === 'ABOUT US' ? '/about-us' : `/${key.toLowerCase()}`;
    
    return {
      title: key,
      path: path,
      description: `${key} section`,
      image: `/assets/${key.toLowerCase().replace(/\s+/g, '-')}-menu-bg.jpg`,
      submenu: headerTranslations.menu[key].submenu.map((sub, subIdx) => ({
        title: sub.title,
        path: `${path}/${sub.title.toLowerCase().replace(/\s+/g, '-')}`,
        image: `/assets/${sub.title.toLowerCase().replace(/\s+/g, '-')}-small.jpg`,
        description: sub.desc
      }))
    };
  });

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

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleSubmenu = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="logo-link" aria-label="Đến trang chủ">
          <img src="public/assets/logo.jpg" alt="Sonit Custom" className="logo-animated" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="nav-links desktop-nav">
          {menuItems.map((item, index) => (
            <div className="nav-item" key={index}>
              <Link to={item.path} className="nav-link">
                <span className="menu-icon">{item.icon}</span>
                {item.title}
              </Link>
              {item.submenu && item.submenu.length > 0 && item.title === 'STORE' && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="dropdown-content">
                    <div className="dropdown-image-container">
                      <img src={item.image} alt={item.title} className="dropdown-main-image" />
                    </div>
                    <div className="dropdown-links">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link 
                          key={subIndex} 
                          to={subItem.path} 
                          className="submenu-item"
                        >
                          <div className="submenu-image">
                            <img src={subItem.image} alt={subItem.title} />
                          </div>
                          <div className="submenu-info">
                            <span className="submenu-title">{subItem.title}</span>
                            <span className="submenu-description">{subItem.description}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </nav>
        
      <div className="language-social">
          <button className="lang-btn active">
            English
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-content">
          <nav className="mobile-nav">
            {menuItems.map((item, index) => (
              <div className="mobile-nav-item" key={index}>
                <div 
                  className="mobile-nav-header"
                  onClick={() => item.submenu && item.submenu.length > 0 && item.title === 'STORE' && toggleSubmenu(index)}
                >
                  {!(item.submenu && item.submenu.length > 0 && item.title === 'STORE') ? (
                    <Link to={item.path} onClick={toggleMobileMenu}>
                      <span className="mobile-menu-icon">{item.icon}</span>
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <Link to={item.path} onClick={(e) => {
                        if (item.submenu && item.submenu.length > 0 && item.title === 'STORE') {
                          e.preventDefault();
                          toggleSubmenu(index);
                        }
                      }}>
                        <span className="mobile-menu-icon">{item.icon}</span>
                        {item.title}
                      </Link>
                      <span className={`mobile-dropdown-arrow ${expandedItems[index] ? 'expanded' : ''}`}>
                        ▼
                      </span>
                    </>
                  )}
                </div>
                
                {item.submenu && item.submenu.length > 0 && item.title === 'STORE' && (
                  <div className={`mobile-submenu ${expandedItems[index] ? 'expanded' : ''}`}>
                    {item.submenu.map((subItem, subIndex) => (
                      <Link 
                        key={subIndex} 
                        to={subItem.path} 
                        className="mobile-submenu-item"
                        onClick={toggleMobileMenu}
                      >
                        <div className="mobile-submenu-image">
                          <img src={subItem.image} alt={subItem.title} />
                        </div>
                        <div className="mobile-submenu-info">
                          <span className="mobile-submenu-title">{subItem.title}</span>
                          <span className="mobile-submenu-description">{subItem.description}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          <div className="mobile-language-social">
            <div className="language-links">
              <button className="lang-btn active">
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; 