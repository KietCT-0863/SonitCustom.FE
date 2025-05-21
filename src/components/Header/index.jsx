import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import UserDropdown from './UserDropdown';
import { useUser } from '../../contexts/UserContext';
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
  const { user, logout } = useUser();
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

  useEffect(() => {
    // Đóng dropdown menu khi click ra ngoài
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
  
  // Handle window resize
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
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleSubmenu = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Cải thiện xử lý hover và click trên mobile
  const handleMenuItemHover = (index) => {
    if (window.innerWidth > 992) {
      setActiveDropdown(index);
    }
  };

  const handleMenuItemLeave = () => {
    if (window.innerWidth > 992) {
      setTimeout(() => {
        setActiveDropdown(null);
      }, 200);
    }
  };

  const handleMenuItemClick = (index, event) => {
    if (window.innerWidth <= 992) {
      event.preventDefault();
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

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
                <Link 
                  to={item.path} 
                  className="nav-link"
                  onClick={(e) => handleMenuItemClick(index, e)}
                >
                  {item.title}
                  {item.submenu && item.submenu.length > 0 && (
                    <span className="dropdown-arrow">▼</span>
                  )}
                </Link>
                {item.submenu && item.submenu.length > 0 && (
                  <div 
                    className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}
                    onClick={e => e.stopPropagation()}
                  >
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
            {user ? (
              <UserDropdown />
            ) : (
              <>
                <Link to="/login" className="auth-link login-btn">
                  LOGIN
                </Link>
                <Link to="/register" className="auth-link register-btn">
                  REGISTER
                </Link>
              </>
            )}
          </div>
          <div className="cart-icon">
            <Link to="/cart" aria-label="Shopping Cart">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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

            {!user ? (
              <>
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
              </>
            ) : (
              <>
                <div className="mobile-nav-item">
                  <div className="mobile-nav-header">
                    <Link to="/account" onClick={toggleMobileMenu}>
                      TÀI KHOẢN
                    </Link>
                  </div>
                </div>
                {user.roleName === 'admin' && (
                  <div className="mobile-nav-item">
                    <div className="mobile-nav-header">
                      <Link to="/admin" onClick={toggleMobileMenu}>
                        ADMIN
                      </Link>
                    </div>
                  </div>
                )}
                <div className="mobile-nav-item">
                  <div className="mobile-nav-header">
                    <Link to="/" onClick={() => {
                      toggleMobileMenu();
                      logout();
                    }}>
                      ĐĂNG XUẤT
                    </Link>
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header; 