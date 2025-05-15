import React, { useEffect } from 'react';
import './styles.css';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho component Pagination
const paginationTranslations = {
  en: {
    prev: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of'
  },
  vi: {
    prev: 'Trước',
    next: 'Sau',
    page: 'Trang',
    of: 'của'
  }
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { registerTranslations } = useLanguage();
  
  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('pagination', paginationTranslations);
  }, [registerTranslations]);
  
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Nếu tổng số trang <= max, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu tiên
      pages.push(1);
      
      if (currentPage <= 3) {
        // Nếu ở gần đầu, hiển thị các trang đầu tiên
        pages.push(2, 3, 4);
        pages.push('...');
      } else if (currentPage >= totalPages - 2) {
        // Nếu ở gần cuối, hiển thị các trang cuối
        pages.push('...');
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        // Ở giữa, hiển thị các trang xung quanh trang hiện tại
        pages.push('...');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('...');
      }
      
      // Luôn hiển thị trang cuối cùng
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title={t('pagination.prev', 'Previous')}
      >
        &lt;
      </button>
      
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
        ) : (
          <button
            key={page}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      ))}
      
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title={t('pagination.next', 'Next')}
      >
        &gt;
      </button>
    </div>
  );
};

export { Pagination }; 