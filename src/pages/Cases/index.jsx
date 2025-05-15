import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { ProductsGrid } from '../../components/ProductsPage/ProductsGrid';
import { ProductFilter } from '../../components/ProductsPage/ProductFilter';
import { SearchBar } from '../../components/ProductsPage/SearchBar';
import { Pagination } from '../../components/ProductsPage/Pagination';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho trang Cases
const casesTranslations = {
  en: {
    bannerTitle: 'EXCEED CASES',
    bannerDesc: 'Protect your equipment with our premium cases',
    categories: [
      { id: 'all', name: 'ALL' },
      { id: 'hard-cases', name: 'HARD CASES' },
      { id: 'soft-cases', name: 'SOFT CASES' },
      { id: 'multi-cue', name: 'MULTI-CUE' },
      { id: 'travel', name: 'TRAVEL' }
    ],
    filter: {
      priceRanges: [
        { id: 'all', name: 'All prices' },
        { id: 'under-100', name: 'Under $100' },
        { id: '100-200', name: '$100 - $200' },
        { id: '200-300', name: '$200 - $300' },
        { id: 'over-300', name: 'Over $300' }
      ],
      colors: [
        { id: 'black', name: 'Black', hex: '#000000' },
        { id: 'brown', name: 'Brown', hex: '#8B4513' },
        { id: 'blue', name: 'Blue', hex: '#0000FF' },
        { id: 'red', name: 'Red', hex: '#FF0000' }
      ],
      status: [
        { id: 'all', name: 'All' },
        { id: 'in-stock', name: 'In Stock' },
        { id: 'out-of-stock', name: 'Out of Stock' },
        { id: 'pre-order', name: 'Pre-order' }
      ]
    }
  },
  vi: {
    bannerTitle: 'TÚI ĐỰNG EXCEED',
    bannerDesc: 'Bảo vệ thiết bị của bạn với túi đựng cao cấp',
    categories: [
      { id: 'all', name: 'TẤT CẢ' },
      { id: 'hard-cases', name: 'TÚI CỨNG' },
      { id: 'soft-cases', name: 'TÚI MỀM' },
      { id: 'multi-cue', name: 'NHIỀU CÂY CƠ' },
      { id: 'travel', name: 'DU LỊCH' }
    ],
    filter: {
      priceRanges: [
        { id: 'all', name: 'Tất cả mức giá' },
        { id: 'under-100', name: 'Dưới 2.3 triệu' },
        { id: '100-200', name: '2.3 - 4.6 triệu' },
        { id: '200-300', name: '4.6 - 7 triệu' },
        { id: 'over-300', name: 'Trên 7 triệu' }
      ],
      colors: [
        { id: 'black', name: 'Đen', hex: '#000000' },
        { id: 'brown', name: 'Nâu', hex: '#8B4513' },
        { id: 'blue', name: 'Xanh', hex: '#0000FF' },
        { id: 'red', name: 'Đỏ', hex: '#FF0000' }
      ],
      status: [
        { id: 'all', name: 'Tất cả' },
        { id: 'in-stock', name: 'Còn hàng' },
        { id: 'out-of-stock', name: 'Hết hàng' },
        { id: 'pre-order', name: 'Đặt trước' }
      ]
    }
  }
};

const CasesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();
  const { language, registerTranslations } = useLanguage();
  
  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('cases', casesTranslations);
  }, [registerTranslations]);
  
  const casesCategories = casesTranslations[language].categories;
  const filterOptions = casesTranslations[language].filter;
  
  const casesProducts = [
    {
      id: 1,
      name: 'EXCEED HARD CASE',
      category: 'hard-cases',
      image: '/images/cases/hard-case-1.jpg',
      secondaryImageUrl: '/images/cases/hard-case-1-2.jpg',
      price: 159.99,
      path: '/products/cases/hard-cases/hard-1',
      status: t('common.status.inStock', 'In Stock'),
      colors: ['#000000', '#8B4513'],
      discount: 0,
      isNew: true
    },
    {
      id: 2,
      name: 'EXCEED SOFT CASE',
      category: 'soft-cases',
      image: '/images/cases/soft-case-1.jpg',
      price: 89.99,
      path: '/products/cases/soft-cases/soft-1',
      status: t('common.status.inStock', 'In Stock'),
      colors: ['#000000', '#0000FF'],
      discount: 10,
      isNew: false
    },
    {
      id: 3,
      name: 'EXCEED PRO TRAVEL CASE',
      category: 'travel',
      image: '/images/cases/travel-case-1.jpg',
      price: 229.99,
      path: '/products/cases/travel/travel-1',
      status: t('common.status.preOrder', 'Pre-order'),
      colors: ['#000000'],
      discount: 0,
      isNew: true
    },
    {
      id: 4,
      name: 'EXCEED 3x4 CASE',
      category: 'multi-cue',
      image: '/images/cases/multi-case-1.jpg',
      price: 349.99,
      path: '/products/cases/multi-cue/multi-1',
      status: t('common.status.inStock', 'In Stock'),
      colors: ['#000000', '#8B4513'],
      discount: 15,
      isNew: false
    },
    {
      id: 5,
      name: 'EXCEED PREMIUM HARD CASE',
      category: 'hard-cases',
      image: '/images/cases/hard-case-2.jpg',
      price: 199.99,
      path: '/products/cases/hard-cases/hard-2',
      status: t('common.status.inStock', 'In Stock'),
      colors: ['#8B4513', '#000000'],
      discount: 0,
      isNew: false
    },
    {
      id: 6,
      name: 'EXCEED 2x2 CASE',
      category: 'multi-cue',
      image: '/images/cases/multi-case-2.jpg',
      price: 259.99,
      path: '/products/cases/multi-cue/multi-2',
      status: t('common.status.outOfStock', 'Out of Stock'),
      colors: ['#000000', '#FF0000'],
      discount: 0,
      isNew: false
    }
  ];
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  
  const handleSortChange = (option) => {
    setSortOption(option);
  };
  
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  
  const handleProductClick = (path) => {
    navigate(path);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo(0, 0);
  };
  
  // Lọc sản phẩm theo các tiêu chí
  let filteredProducts = casesProducts;
  
  // Lọc theo danh mục
  if (activeCategory !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === activeCategory
    );
  }
  
  // Lọc theo search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }
  
  // Sắp xếp sản phẩm
  switch (sortOption) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => b.isNew - a.isNew);
      break;
    default:
      break;
  }
  
  // Phân trang
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  
  return (
    <div className="products-page">
      <div className="products-banner cases-banner">
        <h1>{t('cases.bannerTitle')}</h1>
        <p>{t('cases.bannerDesc')}</p>
      </div>
      
      <div className="products-content">
        <div className="products-search-bar">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="products-filter">
          {casesCategories.map(category => (
            <button 
              key={category.id} 
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="products-filter-sort">
          <ProductFilter 
            options={filterOptions}
            onSortChange={handleSortChange}
            onViewModeChange={handleViewModeChange}
            viewMode={viewMode}
            sortOption={sortOption}
          />
        </div>
        
        <ProductsGrid
          products={currentProducts}
          onProductClick={handleProductClick}
          viewMode={viewMode}
        />
        
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default CasesPage; 