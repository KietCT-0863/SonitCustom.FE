import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

const BlogSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const autoPlayIntervalRef = useRef(null);
  const slidesRef = useRef(null);

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

  const nextSlide = useCallback(() => {
    if (!animating) {
      setAnimating(true);
      setActiveIndex((prevIndex) => 
        prevIndex === blogPosts.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setAnimating(false), 500);
    }
  }, [animating, blogPosts.length]);

  const prevSlide = useCallback(() => {
    if (!animating) {
      setAnimating(true);
      setActiveIndex((prevIndex) => 
        prevIndex === 0 ? blogPosts.length - 1 : prevIndex - 1
      );
      setTimeout(() => setAnimating(false), 500);
    }
  }, [animating, blogPosts.length]);

  const goToSlide = useCallback((index) => {
    if (!animating && index !== activeIndex) {
      setAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setAnimating(false), 500);
    }
  }, [animating, activeIndex]);

  // Auto play with cleanup
  useEffect(() => {
    if (!isHovering) {
      autoPlayIntervalRef.current = setInterval(nextSlide, 5000);
    }
    
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isHovering, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement === slidesRef.current || slidesRef.current.contains(document.activeElement)) {
        if (e.key === 'ArrowRight') {
          nextSlide();
        } else if (e.key === 'ArrowLeft') {
          prevSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Animation variants
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const slideVariants = {
    enterRight: { x: '100%', opacity: 0 },
    enterLeft: { x: '-100%', opacity: 0 },
    center: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exitLeft: { x: '-100%', opacity: 0, transition: { duration: 0.3 } },
    exitRight: { x: '100%', opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <section 
      className="blog-slider-section" 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div 
        className="blog-section-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>BLOG</h2>
        <p>Khám phá thế giới billiards qua những bài viết sâu sắc</p>
      </motion.div>

      <div 
        className="blog-slider-container"
        ref={slidesRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Blog articles"
      >
        <div className="slider-arrows">
          <button 
            className="slider-arrow prev" 
            onClick={prevSlide}
            aria-label="Bài trước"
            tabIndex={0}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="slider-arrow next" 
            onClick={nextSlide}
            aria-label="Bài sau"
            tabIndex={0}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div 
          className="slider-viewport" 
          aria-live="polite"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div 
              key={activeIndex}
              className="blog-slide"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariants}
              role="group"
              aria-roledescription="slide"
              aria-label={`${activeIndex + 1} of ${blogPosts.length}`}
            >
              <motion.div 
                className="blog-slide-content"
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="slide-image-container"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={blogPosts[activeIndex].image} 
                    alt={blogPosts[activeIndex].title} 
                    className="slide-image"
                    loading="lazy"
                  />
                  <div className="slide-category">
                    {categories.find(c => c.id === blogPosts[activeIndex].category)?.name}
                  </div>
                </motion.div>

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
                  <motion.h3 
                    className="slide-title"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {blogPosts[activeIndex].title}
                  </motion.h3>
                  <motion.p 
                    className="slide-excerpt"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {blogPosts[activeIndex].excerpt}
                  </motion.p>
                  <motion.div 
                    className="slide-tags"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {blogPosts[activeIndex].tags.map((tag, i) => (
                      <span key={i} className="slide-tag">#{tag}</span>
                    ))}
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Link to={`/blog/${blogPosts[activeIndex].id}`} className="read-more-link">
                      Đọc tiếp
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="slider-pagination" role="tablist">
          {blogPosts.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Đi đến bài viết ${index + 1}`}
              aria-selected={index === activeIndex}
              role="tab"
            />
          ))}
        </div>
      </div>

      <motion.div 
        className="blog-section-footer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Link to="/blog" className="view-all-button">
          Xem tất cả bài viết
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default BlogSlider; 