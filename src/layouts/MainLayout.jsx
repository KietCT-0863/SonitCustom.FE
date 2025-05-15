import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import './styles.css';

// Component theo dõi route và cập nhật tiêu đề trang
const LanguageAwareContent = () => {
  const location = useLocation();
  const { language, t } = useLanguage();
  
  // Cập nhật tiêu đề trang theo ngôn ngữ và route hiện tại
  useEffect(() => {
    const getPageTitle = () => {
      const path = location.pathname;
      
      // Tạo tiêu đề dựa vào đường dẫn hiện tại
      if (path === '/') return t('layout.header.HOME', 'Sonit Custom');
      if (path === '/cues' || path.startsWith('/cues/')) return t('layout.header.CUES', 'Cues');
      if (path === '/shafts' || path.startsWith('/shafts/')) return t('layout.header.SHAFTS', 'Shafts');
      if (path === '/accessories' || path.startsWith('/accessories/')) return t('layout.header.ACCESSORIES', 'Accessories');
      if (path === '/cases' || path.startsWith('/cases/')) return t('layout.header.CASES', 'Cases');
      if (path === '/technology' || path.startsWith('/technology/')) return t('layout.header.TECHNOLOGY', 'Technology');
      
      // Mặc định là tên công ty
      return 'Sonit Custom';
    };
    
    // Thiết lập tiêu đề trang
    document.title = `${getPageTitle()} | Sonit Custom`;
  }, [location, language, t]);
  
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const MainLayout = () => {
  return (
    <LanguageProvider>
      <div className="main-layout">
        <LanguageAwareContent />
      </div>
    </LanguageProvider>
  );
};

export default MainLayout; 