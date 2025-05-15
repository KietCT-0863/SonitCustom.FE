import React from 'react';
import './styles.css';

const ProductFilter = ({ options, onSortChange, onViewModeChange, viewMode, sortOption }) => {
  return (
    <div className="filter-container">
      <div className="filter-view-controls">
        <div className="view-mode-buttons">
          <button
            className={`view-mode-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Chế độ xem lưới"
          >
            □□
          </button>
          <button
            className={`view-mode-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => onViewModeChange('list')}
            title="Chế độ xem danh sách"
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
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export { ProductFilter }; 