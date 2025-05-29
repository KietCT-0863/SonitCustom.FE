import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop';
import './styles.css';
import { ProductsGrid } from '../../components/ProductsPage/ProductsGrid';
import { SearchBar } from '../../components/ProductsPage/SearchBar';
import { Pagination } from '../../components/ProductsPage/Pagination';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';

// Categories data
const categories = [
  { id: 'artisan-keycap', name: 'Artisan Keycap', subcategories: [
    { id: 'raffle', name: 'Raffle' },
    { id: 'in-stock', name: 'In-stock' },
    { id: 'one-of-a-kind', name: 'One of a kind' },
    { id: 'vault', name: 'Vault' },
  ]},
  { id: 'keyboard', name: 'Keyboard', subcategories: [] },
  { id: 'art-toy', name: 'Art Toy', subcategories: [] },
  { id: 'billiard', name: 'Billiard', subcategories: [
    { id: 'cues', name: 'Cơ Billiard' },
    { id: 'tables', name: 'Bàn Billiard' },
    { id: 'accessories', name: 'Phụ kiện' },
  ]},
  { id: 'accessories', name: 'Accessories', subcategories: [
    { id: 'keychain', name: 'Keychain' },
    { id: 'deskpad', name: 'Deskpad' },
    { id: 't-shirt', name: 'T-shirt' },
  ]},
];

// Colors data for filter
const colorOptions = [
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'red', name: 'Red', hex: '#FF0000' },
  { id: 'green', name: 'Green', hex: '#00FF00' },
  { id: 'blue', name: 'Blue', hex: '#0000FF' },
  { id: 'yellow', name: 'Yellow', hex: '#FFFF00' },
  { id: 'purple', name: 'Purple', hex: '#800080' },
  { id: 'orange', name: 'Orange', hex: '#FFA500' },
];

const sortOptions = [
  { id: 'newest', name: 'Newest' },
  { id: 'price-asc', name: 'Price: Low to High' },
  { id: 'price-desc', name: 'Price: High to Low' }
];

const StoreProducts = [
    {
      id: 1,
    name: 'Keebstation Deskpad',
    category: 'accessories',
    subcategory: 'deskpad',
    image: '/assets/products/keebstation-deskpad.jpg',
    price: 26,
    status: 'IN STOCK',
    colors: ['black', 'white'],
    tags: ['bestseller', 'new'],
    },
    {
      id: 2,
    name: 'Sirius T-shirt',
    category: 'accessories',
    subcategory: 't-shirt',
    image: '/assets/products/sirius-tshirt.jpg',
    price: 27,
    status: 'IN STOCK',
    colors: ['black', 'white'],
    tags: ['limited'],
    },
    {
      id: 3,
    name: 'Sirius Keychain',
    category: 'accessories',
    subcategory: 'keychain',
    image: '/assets/products/sirius-keychain.jpg',
    price: 25,
    status: 'IN STOCK',
    colors: ['black', 'orange', 'blue'],
    tags: ['new'],
    },
    {
      id: 4,
    name: 'Sirius & Goodoo Deskpad',
    category: 'accessories',
    subcategory: 'deskpad',
    image: '/assets/products/sirius-goodoo-deskpad.jpg',
    price: 30,
    status: 'IN STOCK',
    colors: ['orange', 'blue'],
    tags: ['bestseller'],
    },
    {
      id: 5,
    name: 'Bull v2 Keychain',
    category: 'accessories',
    subcategory: 'keychain',
    image: '/assets/products/bull-v2-keychain.jpg',
    price: 25,
    status: 'IN STOCK',
    colors: ['green', 'brown'],
    tags: ['limited'],
    },
    {
      id: 6,
    name: 'Plantopia',
    category: 'artisan-keycap',
    subcategory: 'raffle',
    image: '/assets/products/plantopia.jpg',
    price: 150,
    status: 'RAFFLE ENDED',
    colors: ['green'],
    tags: ['artisan'],
  },
  {
    id: 7,
    name: 'Spiritcaller',
    category: 'artisan-keycap',
    subcategory: 'raffle',
    image: '/assets/products/spiritcaller.jpg',
    price: 180,
    status: 'RAFFLE ENDED',
    colors: ['red', 'brown'],
    tags: ['artisan', 'limited'],
  },
  {
    id: 8,
    name: 'Jungle Sovereign',
    category: 'artisan-keycap',
    subcategory: 'raffle',
    image: '/assets/products/jungle-sovereign.jpg',
    price: 200,
    status: 'RAFFLE ENDED',
    colors: ['red', 'brown', 'white'],
    tags: ['artisan', 'limited'],
  },
  {
    id: 9,
    name: 'Dusk Operative',
    category: 'artisan-keycap',
    subcategory: 'raffle',
    image: '/assets/products/dusk-operative.jpg',
    price: 150,
    status: 'RAFFLE ENDED',
    colors: ['black', 'gray'],
    tags: ['artisan'],
  },
  {
    id: 10,
    name: 'Lotus Prince',
    category: 'artisan-keycap',
    subcategory: 'raffle',
    image: '/assets/products/lotus-prince.jpg',
    price: 180,
    status: 'RAFFLE ENDED',
    colors: ['red', 'pink'],
    tags: ['artisan', 'limited'],
  },
  {
    id: 11,
    name: 'Netherblaze',
    category: 'artisan-keycap',
    subcategory: 'raffle',
    image: '/assets/products/netherblaze.jpg',
    price: 150,
    status: 'RAFFLE ENDED',
    colors: ['blue', 'purple'],
    tags: ['artisan'],
  },
  {
    id: 12,
    name: 'Sparkle Beast',
    category: 'artisan-keycap',
    subcategory: 'raffle',
    image: '/assets/products/sparkle-beast.jpg',
    price: 180,
    status: 'RAFFLE ENDED',
    colors: ['purple', 'pink', 'blue'],
    tags: ['artisan', 'limited'],
  },
  {
    id: 13,
    name: 'Predator Ikon 4-1',
    category: 'billiard',
    subcategory: 'cues',
    image: '/assets/products/billiard/predator-ikon-4-1.jpg',
    price: 990,
    status: 'IN STOCK',
    colors: ['black', 'blue'],
    tags: ['bestseller', 'new'],
  },
  {
    id: 14,
    name: 'Mezz EC7-KL',
    category: 'billiard',
    subcategory: 'cues',
    image: '/assets/products/billiard/mezz-ec7-kl.jpg',
    price: 750,
    status: 'IN STOCK',
    colors: ['brown', 'red'],
    tags: ['limited'],
  },
  {
    id: 15,
    name: 'Brunswick Gold Crown VI',
    category: 'billiard',
    subcategory: 'tables',
    image: '/assets/products/billiard/brunswick-gold-crown.jpg',
    price: 12500,
    status: 'CUSTOM ORDER',
    colors: ['green', 'blue', 'red'],
    tags: ['limited'],
  },
  {
    id: 16,
    name: 'Kamui Black Chalk',
    category: 'billiard',
    subcategory: 'accessories',
    image: '/assets/products/billiard/kamui-black-chalk.jpg',
    price: 25,
    status: 'IN STOCK',
    colors: ['black'],
    tags: ['bestseller'],
  },
];

// Available tags for products
const productTags = [
  { id: 'bestseller', name: 'Best Seller' },
  { id: 'new', name: 'New Arrival' },
  { id: 'limited', name: 'Limited Edition' },
  { id: 'artisan', name: 'Artisan' },
];

const StorePage = () => {
  const navigate = useNavigate();
  
  // State for products and categories
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter state
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [customFilter, setCustomFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Fetch product data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/Product');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/Category');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Toggle mobile filter visibility
  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };
  
  // Handle category change
  const handleCategoryChange = (categoryName) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
    setCurrentPage(1);
  };
  
  // Handle price filter change
  const handlePriceFilterChange = (filter) => {
    setPriceFilter(filter);
    setCurrentPage(1);
  };
  
  // Handle custom filter change
  const handleCustomFilterChange = (filter) => {
    setCustomFilter(filter);
    setCurrentPage(1);
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setActiveCategory(null);
    setSearchTerm('');
    setPriceFilter('all');
    setCustomFilter('all');
    setCurrentPage(1);
  };
  
  // Search handling
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  
  // Sort handling
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  
  // Product click handling
  const handleProductClick = (productId) => {
    navigate(`/store/product/${productId}`);
  };
  
  // Pagination handling
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Apply all filters to products
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (activeCategory && product.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && 
        !product.proName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !product.prodId.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by price
    if (priceFilter === 'free' && product.price !== 0) {
      return false;
    } else if (priceFilter === 'paid' && product.price === 0) {
      return false;
    }
    
    // Filter by custom
    if (customFilter === 'custom' && !product.isCustom) {
      return false;
    } else if (customFilter === 'not-custom' && product.isCustom) {
      return false;
    }
    
    return true;
  });

  // Sort products - default to newest for now
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.price - b.price;
    } else if (sortOption === 'price-desc') {
      return b.price - a.price;
    }
    return 0; // Default, preserve order
  });
  
  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  return (
    <div className="store-page">
      <ScrollToTop />
      
      <div className="store-header">
        <h1 className="store-title">Sản phẩm của chúng tôi</h1>
        <p className="store-description">Khám phá các sản phẩm chất lượng cao từ Sonit Custom</p>
      </div>
      
      <div className="store-filters-and-products">
        {/* Mobile filter toggle */}
        <div className="mobile-filter-toggle" onClick={toggleMobileFilter}>
          <span>Bộ lọc</span>
          <FontAwesomeIcon icon={faFilter} className={showMobileFilter ? 'active' : ''} />
        </div>
        
        {/* Filters */}
        <div className={`store-filters ${showMobileFilter ? 'mobile-show' : ''}`}>
          <div className="filter-section filter-header">
            <h3 className="filter-title">Bộ lọc</h3>
            <button className="close-filter-btn" onClick={toggleMobileFilter}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="filter-section">
            <h3 className="filter-title">Tìm kiếm</h3>
            <div className="search-container">
              <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
            </div>
          </div>
          
          <div className="filter-section">
            <h3 className="filter-title">Danh mục sản phẩm</h3>
            <ul className="category-list">
              <li 
                className={activeCategory === null ? 'active' : ''} 
                onClick={() => handleCategoryChange(null)}
              >
                Tất cả
              </li>
              {categories.map(category => (
                <li 
                  key={category.cateId} 
                  className={activeCategory === category.cateName ? 'active' : ''} 
                  onClick={() => handleCategoryChange(category.cateName)}
                >
                  {category.cateName}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="filter-section">
            <h3 className="filter-title">Giá sản phẩm</h3>
            <ul className="price-list">
              <li 
                className={priceFilter === 'all' ? 'active' : ''} 
                onClick={() => handlePriceFilterChange('all')}
              >
                Tất cả
              </li>
              <li 
                className={priceFilter === 'free' ? 'active' : ''} 
                onClick={() => handlePriceFilterChange('free')}
              >
                Miễn phí
              </li>
              <li 
                className={priceFilter === 'paid' ? 'active' : ''} 
                onClick={() => handlePriceFilterChange('paid')}
              >
                Có phí
              </li>
            </ul>
          </div>
          
          <div className="filter-section">
            <h3 className="filter-title">Tùy chỉnh</h3>
            <ul className="custom-list">
              <li 
                className={customFilter === 'all' ? 'active' : ''} 
                onClick={() => handleCustomFilterChange('all')}
              >
                Tất cả
              </li>
              <li 
                className={customFilter === 'custom' ? 'active' : ''} 
                onClick={() => handleCustomFilterChange('custom')}
              >
                Có thể tùy chỉnh
              </li>
              <li 
                className={customFilter === 'not-custom' ? 'active' : ''} 
                onClick={() => handleCustomFilterChange('not-custom')}
              >
                Không tùy chỉnh
              </li>
            </ul>
          </div>
          
          <div className="filter-section">
            <h3 className="filter-title">Sắp xếp</h3>
            <ul className="sort-list">
              <li 
                className={sortOption === 'newest' ? 'active' : ''} 
                onClick={() => setSortOption('newest')}
              >
                Mới nhất
              </li>
              <li 
                className={sortOption === 'price-asc' ? 'active' : ''} 
                onClick={() => setSortOption('price-asc')}
              >
                Giá: Thấp đến cao
              </li>
              <li 
                className={sortOption === 'price-desc' ? 'active' : ''} 
                onClick={() => setSortOption('price-desc')}
              >
                Giá: Cao đến thấp
              </li>
            </ul>
          </div>
          
          <button className="clear-filters-btn" onClick={clearAllFilters}>
            Xóa bộ lọc
          </button>
        </div>
        
        {/* Products */}
        <div className="store-products">
          {loading ? (
            <LoadingSpinner message="Đang tải sản phẩm..." />
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Thử lại</button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products-message">
              <p>Không tìm thấy sản phẩm phù hợp với bộ lọc của bạn.</p>
              <button onClick={clearAllFilters}>Xóa bộ lọc</button>
            </div>
          ) : (
            <>
              <div className="product-count">
                Hiển thị {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, filteredProducts.length)} / {filteredProducts.length} sản phẩm
              </div>
              
              <ProductsGrid 
                products={currentProducts} 
                onProductClick={handleProductClick} 
              />
              
              <Pagination 
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage; 