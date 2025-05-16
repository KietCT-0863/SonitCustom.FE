import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from '../../components/ProductsPage/SearchBar';
import { Pagination } from '../../components/ProductsPage/Pagination';
import './styles.css';

const TechnologyPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('newest');
  const navigate = useNavigate();
  
  const categories = [
    { id: 'all', name: 'ALL ARTICLES' },
    { id: 'shaft', name: 'SHAFT TECHNOLOGY' },
    { id: 'butt', name: 'BUTT TECHNOLOGY' },
    { id: 'manufacturing', name: 'MANUFACTURING' },
    { id: 'materials', name: 'MATERIALS' },
    { id: 'joints', name: 'JOINT SYSTEMS' }
  ];
  
  // Dữ liệu mẫu cho các bài viết blog
  const blogPosts = [
    {
      id: 1,
      title: 'Advanced EX Pro Shaft Technology',
      category: 'shaft',
      date: '2023-12-15',
      image: '/assets/shaft-tech.jpg',
      excerpt: 'Discover the cutting-edge technology behind our EX Pro shafts that revolutionizes your gameplay...',
      readTime: 5
    },
    {
      id: 2,
      title: 'G-Core System: Perfect Balance and Control',
      category: 'shaft',
      date: '2023-11-20',
      image: '/assets/g-core.jpg',
      excerpt: 'Our G-Core system integrates graphite core technology for unmatched stability and precision...',
      readTime: 7
    },
    {
      id: 3,
      title: 'Exceed Butt Technology Innovation',
      category: 'butt',
      date: '2023-10-05',
      image: '/assets/butt-tech.jpg',
      excerpt: 'Explore how our proprietary butt designs enhance feel, reduce vibration, and improve your stroke...',
      readTime: 6
    },
    {
      id: 4,
      title: 'Manufacturing Excellence: Inside Our Factory',
      category: 'manufacturing',
      date: '2023-09-12',
      image: '/assets/cue-factory.jpg',
      excerpt: 'Take a virtual tour through our state-of-the-art production facility where precision meets craftsmanship...',
      readTime: 8
    },
    {
      id: 5,
      title: 'Material Science: Wood Selection Secrets',
      category: 'materials',
      date: '2023-08-28',
      image: '/assets/wood-selection.jpg',
      excerpt: 'Learn about our rigorous wood selection process and how it affects performance and durability...',
      readTime: 6
    },
    {
      id: 6,
      title: 'Innovation in Joint Systems',
      category: 'joints',
      date: '2023-07-15',
      image: '/assets/joint-systems.jpg',
      excerpt: 'Discover our proprietary joint technologies that ensure perfect alignment and energy transfer...',
      readTime: 5
    }
  ];
  
  // Xử lý thay đổi danh mục
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };
  
  // Xử lý tìm kiếm
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  
  // Xử lý khi click vào bài viết
  const handleBlogClick = (id) => {
    navigate(`/technology/blog/${id}`);
  };
  
  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Lọc bài viết theo danh mục
  let filteredPosts = blogPosts;
  
  if (activeCategory !== 'all') {
    filteredPosts = filteredPosts.filter(post => post.category === activeCategory);
  }
  
  // Lọc theo search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term)
    );
  }
  
  // Sắp xếp bài viết
  switch (sortOption) {
    case 'newest':
      filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'oldest':
      filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    default:
      break;
  }
  
  // Phân trang
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <div className="products-page technology-blog-page">
      <div className="products-banner tech-hero">
        <h1>OUR TECHNOLOGY</h1>
        <p>Explore the innovations and advanced techniques behind Sonit Custom products</p>
      </div>

      <div className="products-content">
        <div className="products-search-bar">
          <SearchBar onSearch={handleSearch} placeholder="Search articles..." />
        </div>
        
        <div className="products-filter">
          {categories.map(category => (
            <button 
              key={category.id} 
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="blog-grid">
          {currentPosts.map(post => (
            <div className="blog-card" key={post.id} onClick={() => handleBlogClick(post.id)}>
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">{formatDate(post.date)}</span>
                  <span className="blog-read-time">
                    {post.readTime} min read
                  </span>
                </div>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <span className="read-more">
                  Read more →
                </span>
              </div>
            </div>
          ))}
        </div>
        
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

export default TechnologyPage; 