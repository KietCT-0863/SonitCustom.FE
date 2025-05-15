import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage, t } from '../../contexts/LanguageContext';
import { SearchBar } from '../../components/ProductsPage/SearchBar';
import { Pagination } from '../../components/ProductsPage/Pagination';
import './styles.css';

// Bản dịch cho trang Technology
const technologyTranslations = {
  en: {
    bannerTitle: 'OUR TECHNOLOGY',
    bannerDesc: 'Explore the innovations and advanced techniques behind Sonit Custom products',
    searchPlaceholder: 'Search articles...',
    categories: [
      { id: 'all', name: 'ALL ARTICLES' },
      { id: 'shaft', name: 'SHAFT TECHNOLOGY' },
      { id: 'butt', name: 'BUTT TECHNOLOGY' },
      { id: 'manufacturing', name: 'MANUFACTURING' },
      { id: 'materials', name: 'MATERIALS' },
      { id: 'joints', name: 'JOINT SYSTEMS' }
    ],
    readMore: 'Read more',
    minRead: 'min read'
  },
  vi: {
    bannerTitle: 'CÔNG NGHỆ CỦA CHÚNG TÔI',
    bannerDesc: 'Khám phá những đổi mới và kỹ thuật tiên tiến đằng sau sản phẩm của Sonit Custom',
    searchPlaceholder: 'Tìm kiếm bài viết...',
    categories: [
      { id: 'all', name: 'TẤT CẢ BÀI VIẾT' },
      { id: 'shaft', name: 'CÔNG NGHỆ THÂN CƠ' },
      { id: 'butt', name: 'CÔNG NGHỆ ĐUÔI CƠ' },
      { id: 'manufacturing', name: 'SẢN XUẤT' },
      { id: 'materials', name: 'VẬT LIỆU' },
      { id: 'joints', name: 'HỆ THỐNG KHỚP NỐI' }
    ],
    readMore: 'Đọc tiếp',
    minRead: 'phút đọc'
  }
};

const TechnologyPage = () => {
  const { language, registerTranslations } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('newest');
  const navigate = useNavigate();

  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('technology', technologyTranslations);
  }, [registerTranslations]);
  
  // Dữ liệu mẫu cho các bài viết blog
  const blogPosts = [
    {
      id: 1,
      title: {
        en: 'Advanced EX Pro Shaft Technology',
        vi: 'Công nghệ tiên tiến của thân cơ EX Pro'
      },
      category: 'shaft',
      date: '2023-12-15',
      image: '/assets/shaft-tech.jpg',
      excerpt: {
        en: 'Discover the cutting-edge technology behind our EX Pro shafts that revolutionizes your gameplay...',
        vi: 'Khám phá công nghệ tiên tiến đằng sau thân cơ EX Pro giúp cách chơi của bạn đột phá...'
      },
      readTime: 5
    },
    {
      id: 2,
      title: {
        en: 'G-Core System: Perfect Balance and Control',
        vi: 'Hệ thống G-Core: Cân bằng và kiểm soát hoàn hảo'
      },
      category: 'shaft',
      date: '2023-11-20',
      image: '/assets/g-core.jpg',
      excerpt: {
        en: 'Our G-Core system integrates graphite core technology for unmatched stability and precision...',
        vi: 'Hệ thống G-Core của chúng tôi tích hợp công nghệ lõi graphite cho độ ổn định và độ chính xác vô song...'
      },
      readTime: 7
    },
    {
      id: 3,
      title: {
        en: 'Exceed Butt Technology Innovation',
        vi: 'Đổi mới công nghệ đuôi cơ Exceed'
      },
      category: 'butt',
      date: '2023-10-05',
      image: '/assets/butt-tech.jpg',
      excerpt: {
        en: 'Explore how our proprietary butt designs enhance feel, reduce vibration, and improve your stroke...',
        vi: 'Khám phá cách thiết kế đuôi cơ độc quyền của chúng tôi nâng cao cảm giác, giảm rung và cải thiện cú đánh của bạn...'
      },
      readTime: 6
    },
    {
      id: 4,
      title: {
        en: 'Manufacturing Excellence: Inside Our Factory',
        vi: 'Sự xuất sắc trong sản xuất: Bên trong nhà máy của chúng tôi'
      },
      category: 'manufacturing',
      date: '2023-09-12',
      image: '/assets/cue-factory.jpg',
      excerpt: {
        en: 'Take a virtual tour through our state-of-the-art production facility where precision meets craftsmanship...',
        vi: 'Tham quan ảo qua cơ sở sản xuất hiện đại của chúng tôi, nơi độ chính xác gặp gỡ tay nghề thủ công...'
      },
      readTime: 8
    },
    {
      id: 5,
      title: {
        en: 'Material Science: Wood Selection Secrets',
        vi: 'Khoa học vật liệu: Bí mật lựa chọn gỗ'
      },
      category: 'materials',
      date: '2023-08-28',
      image: '/assets/wood-selection.jpg',
      excerpt: {
        en: 'Learn about our rigorous wood selection process and how it affects performance and durability...',
        vi: 'Tìm hiểu về quy trình lựa chọn gỗ nghiêm ngặt của chúng tôi và cách nó ảnh hưởng đến hiệu suất và độ bền...'
      },
      readTime: 6
    },
    {
      id: 6,
      title: {
        en: 'Innovation in Joint Systems',
        vi: 'Đổi mới trong hệ thống khớp nối'
      },
      category: 'joints',
      date: '2023-07-15',
      image: '/assets/joint-systems.jpg',
      excerpt: {
        en: 'Discover our proprietary joint technologies that ensure perfect alignment and energy transfer...',
        vi: 'Khám phá công nghệ khớp nối độc quyền đảm bảo sự căn chỉnh hoàn hảo và truyền năng lượng hiệu quả...'
      },
      readTime: 5
    }
  ];

  const categories = technologyTranslations[language].categories;
  
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
    return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', {
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
      post.title[language].toLowerCase().includes(term) ||
      post.excerpt[language].toLowerCase().includes(term)
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
        <h1>{t('technology.bannerTitle')}</h1>
        <p>{t('technology.bannerDesc')}</p>
      </div>

      <div className="products-content">
        <div className="products-search-bar">
          <SearchBar onSearch={handleSearch} placeholder={t('technology.searchPlaceholder')} />
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
                <img src={post.image} alt={post.title[language]} />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">{formatDate(post.date)}</span>
                  <span className="blog-read-time">
                    {post.readTime} {t('technology.minRead')}
                  </span>
                </div>
                <h2 className="blog-title">{post.title[language]}</h2>
                <p className="blog-excerpt">{post.excerpt[language]}</p>
                <span className="read-more">
                  {t('technology.readMore')} →
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