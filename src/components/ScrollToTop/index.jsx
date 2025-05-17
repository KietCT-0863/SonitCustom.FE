import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

const ScrollToTop = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
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
  );
};

export default ScrollToTop; 