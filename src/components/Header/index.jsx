import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
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
      submenu: [
        { title: 'Help', desc: 'Get help with your orders' },
        { title: 'FAQs', desc: 'Frequently asked questions' },
        { title: 'Contact', desc: 'Reach out to us directly' },
        { title: 'Returns', desc: 'Return policy information' }
      ]
    }
  }
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  const headerRef = useRef(null);
  
  const menuKeys = ['STORE',  'CATALOGUE', 'ABOUT US', 'BLOG', 'SUPPORT'];
  const menuItems = menuKeys.map((key, idx) => {
    const path = key === 'ABOUT US' ? '/about-us' : `/${key.toLowerCase()}`;
    
    return {
      title: key,
      path: path,
      description: `${key} section`,
      image: `/assets/${key.toLowerCase().replace(/\s+/g, '-')}-menu-bg.jpg`,
      submenu: headerTranslations.menu[key]?.submenu.map((sub, subIdx) => ({
        title: sub.title,
        path: `${path}/${sub.title.toLowerCase().replace(/\s+/g, '-')}`,
        image: `/assets/${sub.title.toLowerCase().replace(/\s+/g, '-')}-small.jpg`,
        description: sub.desc
      })) || []
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

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleSubmenu = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleMenuItemHover = (index) => {
    setActiveDropdown(index);
  };

  const handleMenuItemLeave = () => {
    // Using a slight delay before closing dropdown for better UX
    setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setActiveDropdown(activeDropdown === index ? null : index);
      event.preventDefault();
    }
  };

  return (
    <>
      <header ref={headerRef} className={`header ${scrolled ? 'scrolled' : ''}`}>
        {/* Left Section - Logo */}
        <div className="header-left">
          <Logo size="medium" animated={false} linkTo="/" />
        </div>
        
        {/* Middle Section - Navigation */}
        <div className="header-middle">
          <nav className="nav-links desktop-nav" aria-label="Main Navigation">
            {menuItems.map((item, index) => (
              <div 
                className={`nav-item ${activeDropdown === index ? 'active' : ''}`} 
                key={index}
                onMouseEnter={() => handleMenuItemHover(index)}
                onMouseLeave={handleMenuItemLeave}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={0}
              >
                <Link to={item.path} className="nav-link">
                  {item.title}
                  {item.submenu && item.submenu.length > 0 && (
                    <span className="dropdown-arrow">▼</span>
                  )}
                </Link>
                {item.submenu && item.submenu.length > 0 && (
                  <div className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}>
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
        </div>
        
        {/* Right Section - Authentication & Cart */}
        <div className="header-right">
          <div className="user-actions">
            <Link to="/login" className="auth-link login-btn">
              LOGIN
            </Link>
            <Link to="/register" className="auth-link register-btn">
              REGISTER
            </Link>
          </div>
        </div>
  
        {/* Mobile Menu Button */}
        <div className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Menu" aria-expanded={mobileMenuOpen}>
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
          <nav className="mobile-nav" aria-label="Mobile Navigation">
            {menuItems.map((item, index) => (
              <div className="mobile-nav-item" key={index}>
                <div className="mobile-nav-header">
                  <Link to={item.path} onClick={(e) => {
                    // Luôn cho phép điều hướng đến trang chính
                    toggleMobileMenu();
                  }}>
                    {item.title}
                  </Link>
                  
                  {/* Nếu có submenu thì hiển thị nút mở/đóng riêng */}
                  {item.submenu && item.submenu.length > 0 && (
                    <span 
                      className={`mobile-dropdown-arrow ${expandedItems[index] ? 'expanded' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubmenu(index);
                      }}
                    >
                      ▼
                    </span>
                  )}
                </div>
                
                {item.submenu && item.submenu.length > 0 && (
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

            <div className="mobile-nav-item">
              <div className="mobile-nav-header">
                <Link to="/login" onClick={toggleMobileMenu}>
                  LOGIN
                </Link>
              </div>
            </div>
            <div className="mobile-nav-item">
              <div className="mobile-nav-header">
                <Link to="/register" onClick={toggleMobileMenu}>
                  REGISTER
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header; 