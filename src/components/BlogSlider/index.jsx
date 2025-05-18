import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

const BlogSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const autoPlayRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Dữ liệu blog mẫu, phù hợp với cấu trúc trong trang Blog chính
  const blogPosts = [
    {
      id: 1,
      title: "Guide to Choosing the Right Billiard Cue",  
      excerpt: "Discover the important factors to consider when choosing the right billiard cue for your playing style.",
      category: "equipment",
      image: "/assets/blog/cue-guide.jpg",
      author: "John Smith",
      date: "2024-03-15",
      readTime: "5 min",
      tags: ["billiard cue", "guide", "equipment"]
    },
    {
      id: 2,
      title: "10 Basic Techniques in Billiard",
      excerpt: "Master these fundamental billiard techniques to improve your game and gain more confidence at the table.",
      category: "technique",
      image: "/assets/blog/techniques.jpg",
      author: "David Lee",
      date: "2024-03-10",
      readTime: "8 min",
      tags: ["technique", "basic", "guide"]
    },
    {
      id: 3,
      title: "Vietnam Billiard Championship 2024",
      excerpt: "Detailed information about the largest billiard tournament in Vietnam in 2024, attracting top billiard players.",
      category: "events",
      image: "/assets/blog/tournament.jpg",
      author: "Mike Wilson",
      date: "2024-03-05",
      readTime: "6 min",
      tags: ["tournament", "event", "news"]
    },
    {
      id: 4,
      title: "Advanced EX Pro Shaft Technology",
      excerpt: "Discover the latest advancements in our EX Pro shaft featuring carbon fiber reinforcement and multi-layer construction.",
      category: "equipment",
      image: "/assets/shaft-tech.jpg",
      author: "Alex Nguyen",
      date: "2023-12-15",
      readTime: "7 min",
      tags: ["shaft", "technology", "equipment"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'technique', name: 'Technique' },
    { id: 'equipment', name: 'Equipment' },
    { id: 'news', name: 'News' },
    { id: 'events', name: 'Events' }
  ];

  // Auto play
  useEffect(() => {
    autoPlayRef.current = nextSlide;
    
    const play = () => {
      if (!isHovering) {
        autoPlayRef.current();
      }
    };
    
    const interval = setInterval(play, 5000);
    
    return () => clearInterval(interval);
  }, [isHovering]);

  const nextSlide = () => {
    if (!animating) {
      setAnimating(true);
      setActiveIndex((prevIndex) => 
        prevIndex === blogPosts.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!animating) {
      setAnimating(true);
      setActiveIndex((prevIndex) => 
        prevIndex === 0 ? blogPosts.length - 1 : prevIndex - 1
      );
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!animating && index !== activeIndex) {
      setAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setAnimating(false), 500);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section 
      className="blog-slider-section"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="blog-section-header">
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          BLOG
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
         Explore the world of billiards through insightful articles
        </motion.p>
      </div>

      <div className="blog-slider-container">
        <div className="slider-arrows">
          <button 
            className="slider-arrow prev" 
            onClick={prevSlide}
            aria-label="Previous blog"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="slider-arrow next" 
            onClick={nextSlide}
            aria-label="Next blog"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeIndex}
            className="blog-slide"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="blog-slide-content">
              <div className="slide-image-container">
                <img 
                  src={blogPosts[activeIndex].image} 
                  alt={blogPosts[activeIndex].title} 
                  className="slide-image"
                />
                <div className="slide-category">
                  {categories.find(c => c.id === blogPosts[activeIndex].category)?.name}
                </div>
              </div>
              <div className="slide-info">
                <div className="slide-meta">
                  <span className="slide-date">
                    {new Date(blogPosts[activeIndex].date).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="slide-read-time">{blogPosts[activeIndex].readTime}</span>
                </div>
                <h3 className="slide-title">{blogPosts[activeIndex].title}</h3>
                <p className="slide-excerpt">{blogPosts[activeIndex].excerpt}</p>
                <div className="slide-tags">
                  {blogPosts[activeIndex].tags.map((tag, i) => (
                    <span key={i} className="slide-tag">#{tag}</span>
                  ))}
                </div>
                <Link to={`/blog/${blogPosts[activeIndex].id}`} className="read-more-link">
                  Đọc tiếp
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="slider-pagination">
          {blogPosts.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to blog ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="blog-section-footer">
        <Link to="/blog" className="view-all-button">
          Xem tất cả bài viết
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default BlogSlider; 