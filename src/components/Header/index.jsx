import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Đăng ký bản dịch riêng cho menu phức tạp
const headerTranslations = {
  en: {
    menu: {
      CUES: {
        desc: 'Precision engineered cues crafted for ultimate performance',
        submenu: [
          { title: 'MIYABI', desc: 'Japanese edition with premium craftsmanship' },
          { title: 'KOUKAI', desc: 'Professional series with enhanced control' },
          { title: 'SANTA FE', desc: 'Stylish designs with southwest inspiration' },
          { title: 'EXICS', desc: 'Tournament grade performance cues' }
        ]
      },
      SHAFTS: {
        desc: 'Advanced technology shafts for precision play',
        submenu: [
          { title: 'EX PRO', desc: 'High-end professional grade shafts' },
          { title: 'S3', desc: 'Three-piece innovative shaft design' },
          { title: 'G-CORE', desc: 'Graphite core for ultimate stability' }
        ]
      },
      ACCESSORIES: {
        desc: 'Essential accessories to enhance your game',
        submenu: [
          { title: 'CHALKS', desc: 'Premium chalks for optimal tip friction' },
          { title: 'TIPS', desc: 'Professional grade performance tips' },
          { title: 'GLOVES', desc: 'Comfortable gloves for smooth strokes' }
        ]
      },
      CASES: {
        desc: 'Stylish and durable cases to protect your equipment',
        submenu: [
          { title: 'SOFT CASES', desc: 'Lightweight and flexible travel cases' },
          { title: 'HARD CASES', desc: 'Maximum protection for valuable cues' }
        ]
      },
      TECHNOLOGY: {
        desc: 'Innovative technologies that set our products apart',
        submenu: [
          { title: 'SHAFT TECHNOLOGY', desc: 'Advanced engineering for optimal performance' },
          { title: 'BUTT TECHNOLOGY', desc: 'Innovative designs for better handling' }
        ]
      },
      DEALER: {
        desc: 'Locate authorized dealers worldwide',
        submenu: [
          { title: 'USA DEALERS', desc: 'Find dealers across the United States' },
          { title: 'INTERNATIONAL', desc: 'Global network of authorized retailers' }
        ]
      }
    },
    JAPANESE: 'Japanese',
    ENGLISH: 'English',
    VIETNAMESE: 'Vietnamese',
  },
  vi: {
    menu: {
      CUES: {
        desc: 'Cơ Exceed chuẩn xác cho hiệu suất tối ưu',
        submenu: [
          { title: 'MIYABI', desc: 'Phiên bản Nhật Bản, thủ công cao cấp' },
          { title: 'KOUKAI', desc: 'Dòng chuyên nghiệp, kiểm soát tối ưu' },
          { title: 'SANTA FE', desc: 'Thiết kế cảm hứng Tây Nam Mỹ' },
          { title: 'EXICS', desc: 'Cơ thi đấu chuẩn quốc tế' }
        ]
      },
      SHAFTS: {
        desc: 'Thân cơ công nghệ cao cho cú đánh chính xác',
        submenu: [
          { title: 'EX PRO', desc: 'Thân cơ chuyên nghiệp cao cấp' },
          { title: 'S3', desc: 'Thiết kế 3 khúc sáng tạo' },
          { title: 'G-CORE', desc: 'Lõi graphite siêu ổn định' }
        ]
      },
      ACCESSORIES: {
        desc: 'Phụ kiện thiết yếu nâng tầm trận đấu',
        submenu: [
          { title: 'CHALKS', desc: 'Phấn cao cấp cho đầu cơ' },
          { title: 'TIPS', desc: 'Đầu cơ chuyên nghiệp' },
          { title: 'GLOVES', desc: 'Găng tay êm ái, mượt mà' }
        ]
      },
      CASES: {
        desc: 'Túi đựng bền đẹp, bảo vệ tối đa',
        submenu: [
          { title: 'SOFT CASES', desc: 'Túi mềm nhẹ, tiện di chuyển' },
          { title: 'HARD CASES', desc: 'Túi cứng bảo vệ tối đa' }
        ]
      },
      TECHNOLOGY: {
        desc: 'Công nghệ đột phá tạo nên khác biệt',
        submenu: [
          { title: 'SHAFT TECHNOLOGY', desc: 'Kỹ thuật thân cơ tối ưu' },
          { title: 'BUTT TECHNOLOGY', desc: 'Thiết kế đuôi cơ sáng tạo' }
        ]
      },
      DEALER: {
        desc: 'Tìm đại lý ủy quyền toàn quốc',
        submenu: [
          { title: 'USA DEALERS', desc: 'Đại lý tại Hoa Kỳ' },
          { title: 'INTERNATIONAL', desc: 'Hệ thống đại lý toàn cầu' }
        ]
      }
    },
    JAPANESE: 'Tiếng Nhật',
    ENGLISH: 'Tiếng Anh',
    VIETNAMESE: 'Tiếng Việt',
  }
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const { language, setLanguage, registerTranslations } = useLanguage();
  
  // Đăng ký bản dịch cho header
  useEffect(() => {
    registerTranslations('header', headerTranslations);
  }, [registerTranslations]);

  const menuKeys = ['CUES', 'SHAFTS', 'ACCESSORIES', 'CASES', 'TECHNOLOGY', 'DEALER'];
  const menuItems = menuKeys.map((key, idx) => ({
    title: t(`layout.header.${key}`),
    path: `/${key.toLowerCase()}`,
    icon: ['🎱','🔧','🧩','💼','⚙️','🔍'][idx],
    description: t(`header.menu.${key}.desc`),
    image: `/assets/${key.toLowerCase()}-menu-bg.jpg`,
    submenu: headerTranslations[language].menu[key].submenu.map((sub, subIdx) => ({
      title: sub.title,
      path: `/${key.toLowerCase()}/${sub.title.toLowerCase().replace(/\s+/g, '-')}`,
      image: `/assets/${sub.title.toLowerCase().replace(/\s+/g, '-')}-small.jpg`,
      description: sub.desc
    }))
  }));

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
          <img src="/public/assets/logo.jpg" alt="Sonit Custom" className="logo-animated" />
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
          <button
            className={`lang-btn${language === 'vi' ? ' active' : ''}`}
            onClick={() => setLanguage('vi')}
          >
            {t('header.VIETNAMESE', 'Tiếng Việt')}
          </button>
          <button
            className={`lang-btn${language === 'en' ? ' active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            {t('header.ENGLISH', 'English')}
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
              <button
                className={`lang-btn${language === 'vi' ? ' active' : ''}`}
                onClick={() => setLanguage('vi')}
              >
                {t('header.VIETNAMESE', 'Tiếng Việt')}
              </button>
              <button
                className={`lang-btn${language === 'en' ? ' active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                {t('header.ENGLISH', 'English')}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Header; 