import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { ProductsGrid } from '../../components/ProductsPage/ProductsGrid';
import { ProductFilter } from '../../components/ProductsPage/ProductFilter';
import { SearchBar } from '../../components/ProductsPage/SearchBar';
import { Pagination } from '../../components/ProductsPage/Pagination';

const AccessoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();
  
  const accessoryCategories = [
    { id: 'all', name: 'TẤT CẢ' },
    { id: 'chalks', name: 'CHALKS' },
    { id: 'tips', name: 'TIPS' },
    { id: 'gloves', name: 'GLOVES' },
    { id: 'tools', name: 'TOOLS' }
  ];
  
  const filterOptions = {
    priceRanges: [
      { id: 'all', name: 'Tất cả mức giá' },
      { id: 'under-15', name: 'Dưới $15' },
      { id: '15-25', name: '$15 - $25' },
      { id: '25-35', name: '$25 - $35' },
      { id: 'over-35', name: 'Trên $35' }
    ],
    colors: [
      { id: 'black', name: 'Đen', hex: '#000000' },
      { id: 'blue', name: 'Xanh', hex: '#3366FF' },
      { id: 'red', name: 'Đỏ', hex: '#FF3366' }
    ],
    status: [
      { id: 'all', name: 'Tất cả' },
      { id: 'in-stock', name: 'Còn hàng' },
      { id: 'out-of-stock', name: 'Hết hàng' },
      { id: 'pre-order', name: 'Đặt trước' }
    ]
  };
  
  const accessoryProducts = [
    {
      id: 1,
      name: 'PREMIUM CHALK',
      category: 'chalks',
      image: '/images/accessories/premium-chalk.jpg',
      price: 12.99,
      path: '/products/accessories/chalks/premium',
      status: 'In Stock',
      colors: ['#3366FF', '#FFFFFF', '#00CC66'],
      discount: 0,
      isNew: false
    },
    {
      id: 2,
      name: 'PRO TIP SET',
      category: 'tips',
      image: '/images/accessories/pro-tip-set.jpg',
      secondaryImageUrl: '/images/accessories/pro-tip-set-2.jpg',
      price: 24.99,
      path: '/products/accessories/tips/pro-set',
      status: 'In Stock',
      colors: [],
      discount: 0,
      isNew: true
    },
    {
      id: 3,
      name: 'PERFORMANCE GLOVE',
      category: 'gloves',
      image: '/images/accessories/performance-glove.jpg',
      price: 18.50,
      path: '/products/accessories/gloves/performance',
      status: 'In Stock',
      colors: ['#000000', '#3366CC'],
      discount: 10,
      isNew: false
    },
    {
      id: 4,
      name: 'TIP SHAPER',
      category: 'tools',
      image: '/images/accessories/tip-shaper.jpg',
      price: 32.99,
      path: '/products/accessories/tools/tip-shaper',
      status: 'Limited Edition',
      colors: [],
      discount: 0,
      isNew: false
    },
    {
      id: 5,
      name: 'TOURNAMENT CHALK',
      category: 'chalks',
      image: '/images/accessories/tournament-chalk.jpg',
      price: 15.99,
      path: '/products/accessories/chalks/tournament',
      status: 'In Stock',
      colors: ['#3366FF', '#FF3366'],
      discount: 15,
      isNew: true
    },
    {
      id: 6,
      name: 'PREMIUM GLOVE',
      category: 'gloves',
      image: '/images/accessories/premium-glove.jpg',
      price: 22.99,
      path: '/products/accessories/gloves/premium',
      status: 'Pre-order',
      colors: ['#000000'],
      discount: 0,
      isNew: true
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
  let filteredProducts = accessoryProducts;
  
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
      <div className="products-banner accessories-banner">
        <h1>EXCEED ACCESSORIES</h1>
        <p>Essential accessories for your perfect game</p>
      </div>
      
      <div className="products-content">
        <div className="products-search-bar">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="products-filter">
          {accessoryCategories.map(category => (
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

export default AccessoriesPage;