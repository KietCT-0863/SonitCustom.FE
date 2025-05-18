import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop';
import './styles.css';
import { ProductsGrid } from '../../components/ProductsPage/ProductsGrid';
import { SearchBar } from '../../components/ProductsPage/SearchBar';
import { Pagination } from '../../components/ProductsPage/Pagination';
import { motion } from 'framer-motion';

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
  // Filter state
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategories, setActiveSubcategories] = useState([]);
  const [activeColors, setActiveColors] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  
  // Temporary filter state (before applying)
  const [tempCategory, setTempCategory] = useState(null);
  const [tempSubcategories, setTempSubcategories] = useState([]);
  const [tempColors, setTempColors] = useState([]);
  const [tempTags, setTempTags] = useState([]);
  const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: 500 });
  
  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const navigate = useNavigate();

  // Initialize temp filters with active filters
  useEffect(() => {
    setTempCategory(activeCategory);
    setTempSubcategories(activeSubcategories);
    setTempColors(activeColors);
    setTempTags(activeTags);
    setTempPriceRange(priceRange);
  }, [activeCategory, activeSubcategories, activeColors, activeTags, priceRange]);

  // Category handling
  const handleCategoryClick = (categoryId) => {
    if (tempCategory === categoryId) {
      setTempCategory(null);
      setTempSubcategories([]);
    } else {
      setTempCategory(categoryId);
      setTempSubcategories([]);
    }
  };

  // Subcategory handling
  const handleSubcategoryToggle = (subcategoryId) => {
    setTempSubcategories(prev => {
      if (prev.includes(subcategoryId)) {
        return prev.filter(id => id !== subcategoryId);
      } else {
        return [...prev, subcategoryId];
      }
    });
  };
  
  // Color handling
  const handleColorToggle = (colorId) => {
    setTempColors(prev => {
      if (prev.includes(colorId)) {
        return prev.filter(id => id !== colorId);
      } else {
        return [...prev, colorId];
      }
    });
  };
  
  // Tag handling
  const handleTagToggle = (tagId) => {
    setTempTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };
  
  // Price range handling
  const handlePriceRangeChange = (type, value) => {
    setTempPriceRange(prev => ({
      ...prev,
      [type]: parseInt(value, 10) || 0
    }));
  };
  
  // Apply filters
  const applyFilters = () => {
    setActiveCategory(tempCategory);
    setActiveSubcategories(tempSubcategories);
    setActiveColors(tempColors);
    setActiveTags(tempTags);
    setPriceRange(tempPriceRange);
    setCurrentPage(1);
    setIsMobileFilterOpen(false);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setTempCategory(null);
    setTempSubcategories([]);
    setTempColors([]);
    setTempTags([]);
    setTempPriceRange({ min: 0, max: 500 });
  };
  
  // Apply clear filters to active filters
  const applyClearFilters = () => {
    setActiveCategory(null);
    setActiveSubcategories([]);
    setActiveColors([]);
    setActiveTags([]);
    setPriceRange({ min: 0, max: 500 });
    setCurrentPage(1);
    clearFilters();
    setIsMobileFilterOpen(false);
  };
  
  // Toggle mobile filter visibility
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
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
    // Tìm sản phẩm dựa trên ID
    const product = StoreProducts.find(p => p.id === productId);
    if (product) {
      if (product.category === 'billiard') {
        navigate(`/store/billiard/${product.id}`);
      } else if (product.category === 'artisan-keycap') {
        navigate(`/store/artisan-keycap/${product.id}`);
      } else if (product.category === 'accessories') {
        navigate(`/store/accessories/${product.id}`);
      } else {
        navigate(`/store/${product.id}`);
      }
    }
  };
  
  // Pagination handling
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  // Filter products
  let filteredProducts = StoreProducts;
  
  // Filter by category
  if (activeCategory) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === activeCategory
    );
  }
  
  // Filter by subcategories
  if (activeSubcategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      activeSubcategories.includes(product.subcategory)
    );
  }
  
  // Filter by colors
  if (activeColors.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.colors.some(color => activeColors.includes(color))
    );
  }
  
  // Filter by tags
  if (activeTags.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.tags.some(tag => activeTags.includes(tag))
    );
  }
  
  // Filter by price range
  filteredProducts = filteredProducts.filter(product => 
    product.price >= priceRange.min && product.price <= priceRange.max
  );
  
  // Filter by search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(term)
    );
  }
  
  // Sort products
  switch (sortOption) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    default:
      break;
  }
  
  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  return (
    <div className="store-page">
      <motion.div 
        className="breadcrumb"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span>HOME</span> &gt; <span>STORE</span>
      </motion.div>
      
      {/* Mobile Filter Toggle Button */}
      <motion.div 
        className="mobile-filter-toggle"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <button onClick={toggleMobileFilter}>
          {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'} <span className="filter-icon">&#9776;</span>
        </button>
      </motion.div>
      
      <div className="store-container">
        {/* Sidebar with filters */}
        <motion.div 
          className={`store-sidebar ${isMobileFilterOpen ? 'mobile-open' : ''}`}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="filter-header">
            <h2>Filters</h2>
            <button className="close-filter-btn" onClick={toggleMobileFilter}>&times;</button>
          </div>
          
          {/* Categories filter */}
          <div className="filter-section">
            <h3>Categories</h3>
            <ul className="categories-list">
              {categories.map(category => (
                <li key={category.id}>
                  <div className="category-item">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={tempCategory === category.id}
                        onChange={() => handleCategoryClick(category.id)}
                      />
                      <span className="checkbox-text">{category.name}</span>
                    </label>
                    {category.subcategories.length > 0 && (
                      <span className={`dropdown-icon ${tempCategory === category.id ? 'open' : ''}`}>
                        &#9660;
                      </span>
                    )}
                  </div>
                  
                  {tempCategory === category.id && category.subcategories.length > 0 && (
                    <motion.ul 
                      className="subcategories-list"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.subcategories.map(subcategory => (
                        <li key={subcategory.id}>
                          <label className="checkbox-container">
                            <input 
                              type="checkbox"
                              checked={tempSubcategories.includes(subcategory.id)}
                              onChange={() => handleSubcategoryToggle(subcategory.id)}
                            />
                            <span className="checkbox-text">{subcategory.name}</span>
                          </label>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Colors filter */}
          <div className="filter-section">
            <h3>Colors</h3>
            <div className="color-filter-grid">
              {colorOptions.map(color => (
                <div 
                  key={color.id} 
                  className={`color-filter-item ${tempColors.includes(color.id) ? 'active' : ''}`}
                  onClick={() => handleColorToggle(color.id)}
                >
                  <div 
                    className="color-swatch" 
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  ></div>
                  <span className="color-name">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tags filter */}
          <div className="filter-section">
            <h3>Product Type</h3>
            <ul className="tags-list">
              {productTags.map(tag => (
                <li key={tag.id}>
                  <label className="checkbox-container">
                    <input 
                      type="checkbox"
                      checked={tempTags.includes(tag.id)}
                      onChange={() => handleTagToggle(tag.id)}
                    />
                    <span className="checkbox-text">{tag.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Price range filter */}
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <div className="price-input-group">
                <label>Min ($)</label>
                <input 
                  type="number" 
                  value={tempPriceRange.min} 
                  onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                  min="0"
                />
              </div>
              <div className="price-input-group">
                <label>Max ($)</label>
                <input 
                  type="number" 
                  value={tempPriceRange.max} 
                  onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                  min="0"
                />
              </div>
            </div>
          </div>
          
          {/* Filter action buttons */}
          <div className="filter-actions">
            <button className="apply-filter-btn" onClick={applyFilters}>Apply Filters</button>
            <button className="clear-filter-btn" onClick={clearFilters}>Clear Filters</button>
          </div>
        </motion.div>
        
        {/* Main content */}
        <motion.div 
          className="store-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            STORE
          </motion.h1>
          
          {/* Active filters display */}
          {(activeCategory || activeSubcategories.length > 0 || activeColors.length > 0 || activeTags.length > 0 || 
           priceRange.min > 0 || priceRange.max < 500) && (
            <motion.div 
              className="active-filters"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="active-filters-header">
                <h3>Active Filters:</h3>
                <button className="clear-all-btn" onClick={applyClearFilters}>Clear All</button>
              </div>
              <div className="filter-tags">
                {activeCategory && (
                  <motion.span 
                    className="filter-tag"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {categories.find(c => c.id === activeCategory)?.name}
                    <button onClick={() => {
                      setActiveCategory(null);
                      setActiveSubcategories([]);
                      setTempCategory(null);
                      setTempSubcategories([]);
                    }}>&times;</button>
                  </motion.span>
                )}
                
                {activeSubcategories.map(subId => {
                  const category = categories.find(c => c.subcategories.some(sub => sub.id === subId));
                  const subcategory = category?.subcategories.find(sub => sub.id === subId);
                  return (
                    <motion.span 
                      key={subId} 
                      className="filter-tag"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {subcategory?.name}
                      <button onClick={() => {
                        setActiveSubcategories(prev => prev.filter(id => id !== subId));
                        setTempSubcategories(prev => prev.filter(id => id !== subId));
                      }}>&times;</button>
                    </motion.span>
                  );
                })}
                
                {activeColors.map(colorId => (
                  <motion.span 
                    key={colorId} 
                    className="filter-tag"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {colorOptions.find(c => c.id === colorId)?.name}
                    <button onClick={() => {
                      setActiveColors(prev => prev.filter(id => id !== colorId));
                      setTempColors(prev => prev.filter(id => id !== colorId));
                    }}>&times;</button>
                  </motion.span>
                ))}
                
                {activeTags.map(tagId => (
                  <motion.span 
                    key={tagId} 
                    className="filter-tag"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {productTags.find(t => t.id === tagId)?.name}
                    <button onClick={() => {
                      setActiveTags(prev => prev.filter(id => id !== tagId));
                      setTempTags(prev => prev.filter(id => id !== tagId));
                    }}>&times;</button>
                  </motion.span>
                ))}
                
                {(priceRange.min > 0 || priceRange.max < 500) && (
                  <motion.span 
                    className="filter-tag"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Price: ${priceRange.min} - ${priceRange.max}
                    <button onClick={() => {
                      setPriceRange({ min: 0, max: 500 });
                      setTempPriceRange({ min: 0, max: 500 });
                    }}>&times;</button>
                  </motion.span>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Search and sort */}
          <motion.div 
            className="store-header"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <div className="search-container">
              <SearchBar onSearch={handleSearch} placeholder="Search..." />
            </div>
            
            <div className="sort-container">
              <select 
                className="sort-dropdown"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="" disabled>Sort by</option>
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
          
          {/* Products grid */}
          <motion.div 
            className="products-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <motion.div 
                  key={product.id}
                  className="product-card"
                  onClick={() => handleProductClick(product.id)}
                  variants={fadeIn}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className={`product-status ${product.status === 'IN STOCK' ? 'in-stock' : 'raffle-ended'}`}>
                      {product.status}
                    </div>
                    
                    {/* Product tags displayed on the image */}
                    {product.tags.includes('new') && (
                      <div className="product-tag new-tag">New</div>
                    )}
                    {product.tags.includes('bestseller') && (
                      <div className="product-tag bestseller-tag">Best Seller</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">
                      {categories.find(c => c.id === product.category)?.name}
                    </p>
                    <div className="product-colors">
                      {product.colors.map(colorId => {
                        const color = colorOptions.find(c => c.id === colorId);
                        return color ? (
                          <motion.div 
                            key={colorId} 
                            className="product-color-dot" 
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                            whileHover={{ scale: 1.3 }}
                          ></motion.div>
                        ) : null;
                      })}
                    </div>
                    <p className="product-price">${product.price}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="no-products-message"
                variants={fadeIn}
              >
                <p>No products match your selected filters.</p>
                <button onClick={applyClearFilters}>Clear All Filters</button>
              </motion.div>
            )}
          </motion.div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              className="pagination-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
      
      <ScrollToTop />
    </div>
  );
};

export default StorePage; 