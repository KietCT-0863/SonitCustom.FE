import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { ProductsGrid } from '../../components/ProductsPage/ProductsGrid';
import { ProductFilter } from '../../components/ProductsPage/ProductFilter';
import { SearchBar } from '../../components/ProductsPage/SearchBar';
import { Pagination } from '../../components/ProductsPage/Pagination';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho trang Shafts
const shaftsTranslations = {
  en: {
    bannerTitle: 'EXCEED SHAFTS',
    bannerDesc: 'Precision engineered shafts for optimal performance',
    categories: [
      { id: 'all', name: 'ALL' },
      { id: 'ex-pro', name: 'EX PRO' },
      { id: 's3', name: 'S3' },
      { id: 'g-core', name: 'G-CORE' }
    ],
    filter: {
      priceRanges: [
        { id: 'all', name: 'All prices' },
        { id: 'under-300', name: 'Under $300' },
        { id: '300-400', name: '$300 - $400' },
        { id: '400-500', name: '$400 - $500' },
        { id: 'over-500', name: 'Over $500' }
      ],
      colors: [
        { id: 'black', name: 'Black', hex: '#223344' },
        { id: 'brown', name: 'Brown', hex: '#664422' },
        { id: 'white', name: 'White', hex: '#FFFFFF' }
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
    bannerTitle: 'THÂN CƠ EXCEED',
    bannerDesc: 'Thân cơ công nghệ cao cho hiệu suất tối ưu',
    categories: [
      { id: 'all', name: 'TẤT CẢ' },
      { id: 'ex-pro', name: 'EX PRO' },
      { id: 's3', name: 'S3' },
      { id: 'g-core', name: 'G-CORE' }
    ],
    filter: {
      priceRanges: [
        { id: 'all', name: 'Tất cả mức giá' },
        { id: 'under-300', name: 'Dưới 7 triệu' },
        { id: '300-400', name: '7 - 9 triệu' },
        { id: '400-500', name: '9 - 12 triệu' },
        { id: 'over-500', name: 'Trên 12 triệu' }
      ],
      colors: [
        { id: 'black', name: 'Đen', hex: '#223344' },
        { id: 'brown', name: 'Nâu', hex: '#664422' },
        { id: 'white', name: 'Trắng', hex: '#FFFFFF' }
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

const ShaftsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();
  const { language, registerTranslations } = useLanguage();
  
  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('shafts', shaftsTranslations);
  }, [registerTranslations]);
  
  const shaftCategories = shaftsTranslations[language].categories;
  const filterOptions = shaftsTranslations[language].filter;
  
  const shaftProducts = [
    {
      id: 1,
      name: 'EX PRO SHAFT',
      category: 'ex-pro',
      image: '/images/shafts/ex-pro-shaft.jpg',
      price: 450.00,
      path: '/products/shafts/ex-pro/standard',
      status: t('common.status.inStock', 'In Stock'),
      colors: ['#223344', '#664422'],
      discount: 0,
      isNew: true
    },
    {
      id: 2,
      name: 'S3 PREMIUM',
      category: 's3',
      image: '/images/shafts/s3-premium.jpg',
      secondaryImageUrl: '/images/shafts/s3-premium-2.jpg',
      price: 380.00,
      path: '/products/shafts/s3/premium',
      status: t('common.status.inStock', 'In Stock'),
      colors: ['#223344', '#664422', '#884422'],
      discount: 10,
      isNew: false
    },
    {
      id: 3,
      name: 'G-CORE CARBON',
      category: 'g-core',
      image: '/images/shafts/g-core-carbon.jpg',
      price: 520.00,
      path: '/products/shafts/g-core/carbon',
      status: t('common.status.preOrder', 'Pre-order'),
      colors: ['#223344', '#664422'],
      discount: 0,
      isNew: true
    },
    {
      id: 4,
      name: 'EX PRO PLUS',
      category: 'ex-pro',
      image: '/images/shafts/ex-pro-plus.jpg',
      price: 490.00,
      path: '/products/shafts/ex-pro/plus',
      status: t('common.status.inStock', 'In Stock'),
      colors: ['#223344'],
      discount: 0,
      isNew: false
    },
    {
      id: 5,
      name: 'S3 STANDARD',
      category: 's3',
      image: '/images/shafts/s3-standard.jpg',
      price: 320.00,
      path: '/products/shafts/s3/standard',
      status: t('common.status.limitedEdition', 'Limited Edition'),
      colors: ['#223344', '#664422'],
      discount: 0,
      isNew: false
    },
    {
      id: 6,
      name: 'G-CORE STANDARD',
      category: 'g-core',
      image: '/images/shafts/g-core-standard.jpg',
      price: 460.00,
      path: '/products/shafts/g-core/standard',
      status: t('common.status.inStock', 'In Stock'),
      colors: ['#223344', '#664422', '#FFFFFF'],
      discount: 15,
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
  let filteredProducts = shaftProducts;
  
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
      <div className="products-banner shafts-banner">
        <h1>{t('shafts.bannerTitle')}</h1>
        <p>{t('shafts.bannerDesc')}</p>
      </div>
      
      <div className="products-content">
        <div className="products-search-bar">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="products-filter">
          {shaftCategories.map(category => (
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

export default ShaftsPage; 