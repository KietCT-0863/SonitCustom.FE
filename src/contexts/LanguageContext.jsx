import React, { createContext, useContext, useState, useEffect } from 'react';
import allTranslations, { registerTranslations } from './translations';

const LanguageContext = createContext();

const LANG_KEY = 'sonit_language';

const defaultLang = () => {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === 'vi' || saved === 'en') return saved;
  // Ưu tiên trình duyệt, mặc định tiếng Việt
  if (navigator.language.startsWith('vi')) return 'vi';
  return 'en';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(defaultLang());

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
    // Khi ngôn ngữ thay đổi, cập nhật thuộc tính lang cho HTML
    document.documentElement.lang = language;
  }, [language]);

  // Hàm tiện ích để lấy text theo phân cấp key
  const translate = (keyPath, defaultText = '') => {
    try {
      // Hỗ trợ truy cập theo đường dẫn: 'common.loadingText'
      const keys = keyPath.split('.');
      
      if (keys.length === 1) {
        // Nếu chỉ có 1 key, tìm trong common
        return allTranslations.common[language][keys[0]] || defaultText;
      }
      
      // Lấy namespace (phần đầu tiên của đường dẫn)
      const namespace = keys[0];
      
      // Kiểm tra namespace có tồn tại không
      if (!allTranslations[namespace]) {
        console.warn(`Translation namespace not found: ${namespace}`);
        return defaultText;
      }
      
      // Tạo mảng keys mới không bao gồm namespace
      const remainingKeys = keys.slice(1);
      
      // Tìm giá trị theo các key còn lại trong namespace đã chọn
      let result = allTranslations[namespace][language];
      for (const key of remainingKeys) {
        if (result && result[key] !== undefined) {
          result = result[key];
        } else {
          return defaultText;
        }
      }
      
      return result || defaultText;
    } catch (error) {
      console.error(`Translation error for key: ${keyPath}`, error);
      return defaultText;
    }
  };

  // Hàm tiện ích để chuyển đổi status giữa các ngôn ngữ
  const translateStatus = (statusText) => {
    // Map giá trị tiếng Anh sang key
    const statusMap = {
      'In Stock': 'inStock',
      'Out of Stock': 'outOfStock',
      'Pre-order': 'preOrder',
      'Limited Edition': 'limitedEdition'
    };

    // Map giá trị tiếng Việt sang key
    const viStatusMap = {
      'Còn hàng': 'inStock',
      'Hết hàng': 'outOfStock',
      'Đặt trước': 'preOrder',
      'Phiên bản giới hạn': 'limitedEdition'
    };

    // Xác định key dựa trên statusText
    let statusKey;
    if (statusMap[statusText]) {
      statusKey = statusMap[statusText];
    } else if (viStatusMap[statusText]) {
      statusKey = viStatusMap[statusText];
    } else {
      return statusText; // Nếu không tìm thấy, trả về nguyên gốc
    }

    // Trả về bản dịch tương ứng
    return allTranslations.common[language].status[statusKey] || statusText;
  };

  const value = {
    language,
    setLanguage,
    isVietnamese: language === 'vi',
    isEnglish: language === 'en',
    t: translate,
    translateStatus,
    translations: allTranslations,
    registerTranslations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// Tiện ích cho phép sử dụng đơn giản trong code (t('common.loadingText'))
export const t = (keyPath, defaultText = '') => {
  const { t: translate } = useLanguage();
  return translate(keyPath, defaultText);
}; 