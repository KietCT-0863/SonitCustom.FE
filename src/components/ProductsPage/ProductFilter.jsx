import React, { useEffect } from 'react';
import './styles.css';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho component ProductFilter
const productFilterTranslations = {
  en: {
    gridViewTitle: 'Grid view',
    listViewTitle: 'List view',
    sortOptions: {
      newest: 'Newest',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low'
    }
  },
  vi: {
    gridViewTitle: 'Chế độ xem lưới',
    listViewTitle: 'Chế độ xem danh sách',
    sortOptions: {
      newest: 'Mới nhất',
      priceAsc: 'Giá: Thấp đến Cao',
      priceDesc: 'Giá: Cao đến Thấp'
    }
  }
};

const ProductFilter = ({ options, onSortChange, onViewModeChange, viewMode, sortOption }) => {
  const { registerTranslations } = useLanguage();
  
  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('productFilter', productFilterTranslations);
  }, [registerTranslations]);

  return (
    <div className="filter-container">
      <div className="filter-view-controls">
        <div className="view-mode-buttons">
          <button
            className={`view-mode-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title={t('productFilter.gridViewTitle', 'Grid view')}
          >
            □□
          </button>
          <button
            className={`view-mode-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => onViewModeChange('list')}
            title={t('productFilter.listViewTitle', 'List view')}
          >
            ≡
          </button>
        </div>
        
        <div className="sort-control">
          <select
            className="sort-select"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="newest">{t('productFilter.sortOptions.newest', 'Newest')}</option>
            <option value="price-asc">{t('productFilter.sortOptions.priceAsc', 'Price: Low to High')}</option>
            <option value="price-desc">{t('productFilter.sortOptions.priceDesc', 'Price: High to Low')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export { ProductFilter }; 