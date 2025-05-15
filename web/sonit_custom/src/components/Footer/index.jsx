import React, { useEffect } from 'react';
import './styles.css';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Đăng ký bản dịch cho footer
const footerTranslations = {
  en: {
    slogan: 'BORN TO PERFORM',
    copyright: 'Copyright EXCEED CO., LTD. All rights reserved.',
    social: {
      FB: 'Facebook', 
      IG: 'Instagram', 
      YT: 'YouTube',
      X: 'X', 
      TT: 'TikTok'
    }
  },
  vi: {
    slogan: 'SINH RA ĐỂ CHIẾN THẮNG',
    copyright: 'Bản quyền © EXCEED CO., LTD. Đã đăng ký mọi quyền.',
    social: {
      FB: 'Facebook', 
      IG: 'Instagram', 
      YT: 'YouTube', 
      X: 'X', 
      TT: 'TikTok'
    }
  }
};

const Footer = () => {
  const { registerTranslations } = useLanguage();
  
  // Đăng ký bản dịch khi component được tạo
  useEffect(() => {
    registerTranslations('footer', footerTranslations);
  }, [registerTranslations]);
  
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://www.facebook.com/groups/2648184928799088">{t('footer.social.FB')}</a>
        <a href="https://instagram.com">{t('footer.social.IG')}</a>
        <a href="https://youtube.com">{t('footer.social.YT')}</a>
        <a href="https://twitter.com">{t('footer.social.X')}</a>
        <a href="https://tiktok.com">{t('footer.social.TT')}</a>
      </div>

      <p className="slogan font-effect-outline">{t('footer.slogan')}</p>
      <p className="copyright">{t('footer.copyright')}</p>
    </footer>
  );
};

export default Footer;