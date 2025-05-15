import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  
  const menuItems = [
    {
      title: 'CUES',
      path: '/cues',
      icon: '🎱',
      description: 'Precision engineered cues crafted for ultimate performance',
      image: '/assets/cues-menu-bg.jpg',
      submenu: [
        { 
          title: 'MIYABI', 
          path: '/cues/miyabi',
          image: '/assets/miyabi-small.jpg',
          description: 'Japanese edition with premium craftsmanship'
        },
        { 
          title: 'KOUKAI', 
          path: '/cues/koukai',
          image: '/assets/koukai-small.jpg',
          description: 'Professional series with enhanced control'
        },
        { 
          title: 'SANTA FE', 
          path: '/cues/santa-fe',
          image: '/assets/santa-fe-small.jpg',
          description: 'Stylish designs with southwest inspiration'
        },
        { 
          title: 'EXICS', 
          path: '/cues/exics',
          image: '/assets/exics-small.jpg',
          description: 'Tournament grade performance cues'
        }
      ]
    },
    {
      title: 'SHAFTS',
      path: '/shafts',
      icon: '🔧',
      description: 'Advanced technology shafts for precision play',
      image: '/assets/shafts-menu-bg.jpg',
      submenu: [
        { 
          title: 'EX PRO', 
          path: '/shafts/ex-pro',
          image: '/assets/ex-pro-small.jpg',
          description: 'High-end professional grade shafts'
        },
        { 
          title: 'S3', 
          path: '/shafts/s3',
          image: '/assets/s3-small.jpg',
          description: 'Three-piece innovative shaft design'
        },
        { 
          title: 'G-CORE', 
          path: '/shafts/g-core',
          image: '/assets/g-core-small.jpg',
          description: 'Graphite core for ultimate stability'
        }
      ]
    },
    {
      title: 'ACCESSORIES',
      path: '/accessories',
      icon: '🧩',
      description: 'Essential accessories to enhance your game',
      image: '/assets/accessories-menu-bg.jpg',
      submenu: [
        { 
          title: 'CHALKS', 
          path: '/accessories/chalks',
          image: '/assets/chalks-small.jpg',
          description: 'Premium chalks for optimal tip friction'
        },
        { 
          title: 'TIPS', 
          path: '/accessories/tips',
          image: '/assets/tips-small.jpg',
          description: 'Professional grade performance tips'
        },
        { 
          title: 'GLOVES', 
          path: '/accessories/gloves',
          image: '/assets/gloves-small.jpg',
          description: 'Comfortable gloves for smooth strokes'
        }
      ]
    },
    {
      title: 'CASES',
      path: '/cases',
      icon: '💼',
      description: 'Stylish and durable cases to protect your equipment',
      image: '/assets/cases-menu-bg.jpg',
      submenu: [
        { 
          title: 'SOFT CASES', 
          path: '/cases/soft',
          image: '/assets/soft-case-small.jpg',
          description: 'Lightweight and flexible travel cases'
        },
        { 
          title: 'HARD CASES', 
          path: '/cases/hard',
          image: '/assets/hard-case-small.jpg',
          description: 'Maximum protection for valuable cues'
        }
      ]
    },
    {
      title: 'TECHNOLOGY',
      path: '/technology',
      icon: '⚙️',
      description: 'Innovative technologies that set our products apart',
      image: '/assets/technology-menu-bg.jpg',
      submenu: [
        { 
          title: 'SHAFT TECHNOLOGY', 
          path: '/technology/shaft',
          image: '/assets/shaft-tech-small.jpg',
          description: 'Advanced engineering for optimal performance'
        },
        { 
          title: 'BUTT TECHNOLOGY', 
          path: '/technology/butt',
          image: '/assets/butt-tech-small.jpg',
          description: 'Innovative designs for better handling'
        }
      ]
    },
    {
      title: 'FIND A DEALER',
      path: '/dealers',
      icon: '🔍',
      description: 'Locate authorized dealers worldwide',
      image: '/assets/dealers-menu-bg.jpg',
      submenu: [
        { 
          title: 'USA DEALERS', 
          path: '/dealers/usa',
          image: '/assets/usa-dealers-small.jpg',
          description: 'Find dealers across the United States'
        },
        { 
          title: 'INTERNATIONAL', 
          path: '/dealers/international',
          image: '/assets/international-dealers-small.jpg',
          description: 'Global network of authorized retailers'
        }
      ]
    }
  ];

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
        <Link to="/" className="logo-link">
          <img src="/logo.png" alt="Exceed Logo" className="logo" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="nav-links desktop-nav">
          {menuItems.map((item, index) => (
            <div className="nav-item" key={index}>
              <Link to={item.path} className="nav-link">
                <span className="menu-icon">{item.icon}</span>
                {item.title}
              </Link>
              {item.submenu && (
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
          <a href="/japanese">Japanese</a>
          <a href="/english">English</a>
          <div className="social-icons">
            <span>FB</span>
            <span>IG</span>
            <span>YT</span>
          </div>
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
                  onClick={() => item.submenu && toggleSubmenu(index)}
                >
                  {!item.submenu ? (
                    <Link to={item.path} onClick={toggleMobileMenu}>
                      <span className="mobile-menu-icon">{item.icon}</span>
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <Link to={item.path} onClick={(e) => {
                        if (item.submenu) {
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
                
                {item.submenu && (
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
              <a href="/japanese">Japanese</a>
              <a href="/english">English</a>
            </div>
            <div className="mobile-social-icons">
              <span>FB</span>
              <span>IG</span>
              <span>YT</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; 