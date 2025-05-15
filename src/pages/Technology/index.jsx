import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, t } from '../../contexts/LanguageContext';
import './styles.css';

const TechnologyPage = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  
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

  // Lọc bài viết theo danh mục
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  // Danh sách các danh mục
  const categories = [
    { id: 'all', name: { en: 'All Articles', vi: 'Tất cả bài viết' } },
    { id: 'shaft', name: { en: 'Shaft Technology', vi: 'Công nghệ thân cơ' } },
    { id: 'butt', name: { en: 'Butt Technology', vi: 'Công nghệ đuôi cơ' } },
    { id: 'manufacturing', name: { en: 'Manufacturing', vi: 'Sản xuất' } },
    { id: 'materials', name: { en: 'Materials', vi: 'Vật liệu' } },
    { id: 'joints', name: { en: 'Joint Systems', vi: 'Hệ thống khớp nối' } }
  ];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="technology-blog-page">
      <div className="tech-hero">
        <h1>{language === 'vi' ? 'CÔNG NGHỆ CỦA CHÚNG TÔI' : 'OUR TECHNOLOGY'}</h1>
        <p>
          {language === 'vi' 
            ? 'Khám phá những đổi mới và kỹ thuật tiên tiến đằng sau sản phẩm của Sonit Custom' 
            : 'Explore the innovations and advanced techniques behind Sonit Custom products'}
        </p>
      </div>

      <div className="blog-container">
        <div className="blog-filter">
          <h3>{language === 'vi' ? 'Danh mục' : 'Categories'}</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button 
                key={category.id}
                className={activeCategory === category.id ? 'active' : ''}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name[language]}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-grid">
          {filteredPosts.map(post => (
            <Link to={`/technology/blog/${post.id}`} className="blog-card" key={post.id}>
              <div className="blog-image">
                <img src={post.image} alt={post.title[language]} />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">{formatDate(post.date)}</span>
                  <span className="blog-read-time">
                    {post.readTime} {language === 'vi' ? 'phút đọc' : 'min read'}
                  </span>
                </div>
                <h2 className="blog-title">{post.title[language]}</h2>
                <p className="blog-excerpt">{post.excerpt[language]}</p>
                <span className="read-more">
                  {language === 'vi' ? 'Đọc tiếp' : 'Read more'} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage; 