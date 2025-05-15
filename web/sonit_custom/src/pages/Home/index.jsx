import React, { useEffect } from 'react';
import Hero from '../../components/Hero';
import ProductGrid from '../../components/ProductGrid';
import TechnologySection from '../../components/TechnologySection';
import './styles.css';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho trang Home
const homePageTranslations = {
  en: {
    title: 'EXCEED Custom Billiards',
    metaDescription: 'Premium billiard equipment crafted with precision'
  },
  vi: {
    title: 'EXCEED Billiards Cao Cấp',
    metaDescription: 'Dụng cụ bi-a cao cấp được chế tác với độ chính xác tuyệt đối'
  }
};

const HomePage = () => {
  const { registerTranslations } = useLanguage();
  
  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('homePage', homePageTranslations);
  }, [registerTranslations]);
  
  return (
    <div className="home-page">
      <Hero />
      <ProductGrid />
      <TechnologySection />
    </div>
  );
};

export default HomePage; 