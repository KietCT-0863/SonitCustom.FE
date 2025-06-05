import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './styles.css';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'technique', name: 'Technique' },
    { id: 'equipment', name: 'Equipment' },
    { id: 'news', name: 'News' },
    { id: 'events', name: 'Events' }
  ];

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
    }
  ];

  // Check scroll position for scroll-to-top button
  const checkScrollPosition = useCallback(() => {
    if (!showScrollTop && window.pageYOffset > 500) {
      setShowScrollTop(true);
    } else if (showScrollTop && window.pageYOffset <= 500) {
      setShowScrollTop(false);
    }
  }, [showScrollTop]);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, [checkScrollPosition]);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <motion.section 
        className="blog-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            SONIT BLOG
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Explore the world of billiards through in-depth articles
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Search and Filter Section */}
      <motion.section 
        className="blog-filters"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >

        <motion.div 
          className="categories"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {categories.map(category => (
            <motion.button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      </motion.section>

      {/* Blog Posts Grid */}
      <AnimatePresence mode="wait">
        <motion.section 
          className="blog-grid"
          key={selectedCategory + searchTerm}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <motion.div 
                key={`skeleton-${index}`}
                className="blog-card skeleton"
                variants={fadeInUp}
              >
                <div className="card-image skeleton-image"></div>
                <div className="card-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text"></div>
                </div>
              </motion.div>
            ))
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <motion.article
                key={post.id}
                className="blog-card"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <Link to={`/blog/${post.id}`} className="blog-link">
                  <div className="card-image">
                    <img src={post.image} alt={post.title} />
                    <div className="card-category">{categories.find(c => c.id === post.category)?.name}</div>
                  </div>
                  <div className="card-content">
                    <div className="card-meta">
                      <span className="date">{new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                      <span className="read-time">{post.readTime}</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <div className="card-footer">
                      <div className="author">
                        <img src={`/assets/authors/${post.author.toLowerCase().replace(' ', '-')}.jpg`} alt={post.author} />
                        <span>{post.author}</span>
                      </div>
                      <div className="tags">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="tag">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            <motion.div 
              className="no-results"
              variants={fadeInUp}
            >
              <h3>No articles found</h3>
              <p>Try adjusting your search or category filter</p>
            </motion.div>
          )}
        </motion.section>
      </AnimatePresence>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div 
            className="scroll-top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ↑
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog; 