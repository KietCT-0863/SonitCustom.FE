import React, { useState, useEffect } from 'react';
import './styles.css';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho component SearchBar
const searchBarTranslations = {
  en: {
    placeholder: 'Search products...',
    searchLabel: 'search'
  },
  vi: {
    placeholder: 'Tìm kiếm sản phẩm...',
    searchLabel: 'tìm kiếm'
  }
};

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { registerTranslations } = useLanguage();
  
  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('searchBar', searchBarTranslations);
  }, [registerTranslations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder={t('searchBar.placeholder', 'Search products...')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          <span role="img" aria-label={t('searchBar.searchLabel', 'search')}>🔍</span>
        </button>
      </form>
    </div>
  );
};

export { SearchBar }; 