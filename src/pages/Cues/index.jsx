import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { ProductsGrid } from '../../components/ProductsPage/ProductsGrid';
import { ProductFilter } from '../../components/ProductsPage/ProductFilter';
import { SearchBar } from '../../components/ProductsPage/SearchBar';
import { Pagination } from '../../components/ProductsPage/Pagination';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho trang Cues
const cuesTranslations = {
  en: {
    bannerTitle: 'EXCEED CUES',
    bannerDesc: 'Precision engineered for performance',
    categories: [
      { id: 'all', name: 'ALL' },
      { id: 'miyabi', name: 'MIYABI' },
      { id: 'koukai', name: 'KOUKAI' },
      { id: 'santa-fe', name: 'SANTA FE' },
      { id: 'exics', name: 'EXICS' }
    ],
    filter: {
      priceRanges: [
        { id: 'all', name: 'All prices' },
        { id: 'under-1000', name: 'Under $1,000' },
        { id: '1000-2000', name: '$1,000 - $2,000' },
        { id: '2000-3000', name: '$2,000 - $3,000' },
        { id: 'over-3000', name: 'Over $3,000' }
      ],
      colors: [
        { id: 'black', name: 'Black', hex: '#000000' },
        { id: 'brown', name: 'Brown', hex: '#8B4513' },
        { id: 'white', name: 'White', hex: '#FFFFFF' },
        { id: 'blue', name: 'Blue', hex: '#0000FF' }
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
    bannerTitle: 'CƠ EXCEED',
    bannerDesc: 'Chế tác chuẩn xác cho hiệu suất tối ưu',
    categories: [
      { id: 'all', name: 'TẤT CẢ' },
      { id: 'miyabi', name: 'MIYABI' },
      { id: 'koukai', name: 'KOUKAI' },
      { id: 'santa-fe', name: 'SANTA FE' },
      { id: 'exics', name: 'EXICS' }
    ],
    filter: {
      priceRanges: [
        { id: 'all', name: 'Tất cả mức giá' },
        { id: 'under-1000', name: 'Dưới 23 triệu' },
        { id: '1000-2000', name: '23 - 46 triệu' },
        { id: '2000-3000', name: '46 - 69 triệu' },
        { id: 'over-3000', name: 'Trên 69 triệu' }
      ],
      colors: [
        { id: 'black', name: 'Đen', hex: '#000000' },
        { id: 'brown', name: 'Nâu', hex: '#8B4513' },
        { id: 'white', name: 'Trắng', hex: '#FFFFFF' },
        { id: 'blue', name: 'Xanh', hex: '#0000FF' }
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

const CuesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();
  const { language, registerTranslations } = useLanguage();
  
  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('cues', cuesTranslations);
  }, [registerTranslations]);

  const cueCategories = cuesTranslations[language].categories;
  const filterOptions = cuesTranslations[language].filter;
  
  const cueProducts = [
    {
      id: 1,
      name: 'MIYABI SPECIAL EDITION',
      category: 'miyabi',
      image: '/images/cues/miyabi-special.jpg',
      secondaryImageUrl: '/images/cues/miyabi-special-2.jpg',
      price: 2800,
      path: '/products/cues/miyabi/special-edition',
      status: t('common.status.inStock', 'In Stock'),
      colors: ['#000000', '#8B4513'],
      discount: 0,
      isNew: true
    },
    {
      id: 2,
      name: 'KOUKAI CLASSIC',
      category: 'koukai',
      image: '/images/cues/koukai-classic.jpg',
      price: 1950,
      path: '/products/cues/koukai/classic',
      status: t('common.status.preOrder', 'Pre-order'),
      colors: ['#FFFFFF', '#0000FF'],
      discount: 10,
      isNew: false
    },
    {
      id: 3,
      name: 'SANTA FE COLLECTION',
      category: 'santa-fe',
      image: '/images/cues/santa-fe-collection.jpg',
      price: 2400,
      path: '/products/cues/santa-fe/collection',
      status: t('common.status.inStock', 'In Stock'),
      colors: ['#000000', '#8B4513'],
      discount: 15,
      isNew: false
    },
    {
      id: 4,
      name: 'EXICS-13WC2',
      category: 'exics',
      image: '/images/cues/exics-13wc2.jpg',
      price: 2100,
      path: '/products/cues/exics/13wc2',
      status: t('common.status.limitedEdition', 'Limited Edition'),
      colors: ['#000000'],
      discount: 0,
      isNew: true
    },
    {
      id: 5,
      name: 'EXICS-09SF',
      category: 'exics',
      image: '/images/cues/exics-09sf.jpg',
      price: 1850,
      path: '/products/cues/exics/09sf',
      status: t('common.status.inStock', 'In Stock'),
      colors: ['#8B4513', '#FFFFFF'],
      discount: 0,
      isNew: false
    },
    {
      id: 6,
      name: 'MIYABI PRO',
      category: 'miyabi',
      image: '/images/cues/miyabi-pro.jpg',
      price: 3200,
      path: '/products/cues/miyabi/pro',
      status: t('common.status.outOfStock', 'Out of Stock'),
      colors: ['#000000', '#8B4513'],
      discount: 0,
      isNew: false
    },
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
  let filteredProducts = cueProducts;
  
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
      <div className="products-banner cues-banner">
        <h1>{t('cues.bannerTitle')}</h1>
        <p>{t('cues.bannerDesc')}</p>
      </div>
      
      <div className="products-content">
        <div className="products-search-bar">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="products-filter">
          {cueCategories.map(category => (
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

export default CuesPage; 