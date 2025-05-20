import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './styles.css';
import ScrollToTop from '../../components/ScrollToTop';
const AboutUs = () => {
  const timelineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const milestones = [
    {
      year: "2020",
      title: "The Beginning of Passion",
      description: "SONIT CUSTOM was founded by billiard enthusiasts with the mission to elevate the billiard playing experience for Vietnamese people. The first products were born from a small workshop in Ho Chi Minh City.",
      icon: "🌟"
    },
    {
      year: "2021",
      title: "Service Development",
      description: "Expanded the workshop and professional artisan team. Introduced premium custom cue services and became partners with many top billiard players in Vietnam.",
      icon: "🔨"
    },
    {
      year: "2022",
      title: "Global Partnership",
      description: "Established partnerships with famous billiard brands worldwide such as Predator, Mezz, and McDermott. Launched the SONIT Signature collection with exclusive technology.",
      icon: "🤝"
    },
    {
      year: "2023",
      title: "International Expansion",
      description: "Expanded export markets to Southeast Asia and Europe. Participated in and sponsored international billiard tournaments, promoting the Vietnamese brand on the international stage.",
      icon: "🌏"
    },
    {
      year: "2024",
      title: "Innovation & Creativity",
      description: "Launched the SONIT Elite product line with the most advanced processing technology. Opened new showrooms in Hanoi and Da Nang, bringing the product experience closer to customers.",
      icon: "💫"
    }
  ];

  const values = [
    {
      icon: "💎",
      title: "Top Quality",
      description: "Each product is carefully selected and inspected to ensure the best quality",
      color: "#FFD700"
    },
    {
      icon: "🎯",
      title: "Exclusive & Creative",
      description: "Exclusive design, continuous creativity to create unique products",
      color: "#E6007E"
    },
    {
      icon: "🤝",
      title: "Dedicated Service",
      description: "Experienced expert team, ready to advise and support 24/7",
      color: "#4CAF50"
    },
    {
      icon: "🚀",
      title: "Continuous Innovation",
      description: "Constantly updating trends and new technologies in the billiard industry",
      color: "#2196F3"
    }
  ];

  const achievements = [
    { number: "1000+", label: "Satisfied Customers" },
    { number: "500+", label: "Exclusive Cue Models" },
    { number: "50+", label: "Global Partners" },
    { number: "10+", label: "Years of Experience" }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scrollTimeline = (direction) => {
    if (timelineRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      timelineRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToMilestone = (index) => {
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      if (items[index]) {
        const scrollPosition = items[index].offsetLeft - (timelineRef.current.clientWidth / 2) + (items[index].clientWidth / 2);
        
        timelineRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
        
        setActiveIndex(index);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const scrollPosition = timelineRef.current.scrollLeft;
        const viewportWidth = timelineRef.current.clientWidth;
        const items = Array.from(timelineRef.current.querySelectorAll('.timeline-item'));
        
        let itemFound = false;
        
        items.forEach((item, index) => {
          const itemCenter = item.offsetLeft - timelineRef.current.offsetLeft + (item.offsetWidth / 2);
          const viewportCenter = scrollPosition + (viewportWidth / 2);
          
          if (Math.abs(itemCenter - viewportCenter) < item.offsetWidth * 0.75 && !itemFound) {
            setActiveIndex(index);
            itemFound = true;
          }
        });
      }
    };
    
    const timelineElement = timelineRef.current;
    if (timelineElement) {
      timelineElement.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (timelineElement) {
        timelineElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="about-us">
      {/* Hero Section */}
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1>SONIT CUSTOM</h1>
          <p>Where Art Meets Billiard Passion</p>
          <motion.div 
            className="hero-stats"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index}
                className="stat-item"
                variants={fadeInUp}
              >
                <span className="stat-number">{achievement.number}</span>
                <span className="stat-label">{achievement.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Story Section */}
      <section className="about-story">
        <motion.div 
          className="story-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2>Our Story</h2>
          <div className="story-grid">
            <div className="story-text">
              <p>
                SONIT CUSTOM was founded by billiard enthusiasts, with the aspiration to bring world-class billiard products to Vietnamese players.
              </p>
              <p>
                We are not just a place to provide billiard products, but also a place to create unique works of art, combining aesthetics and functionality.
              </p>
              <p>
                With a team of skilled craftsmen and industry experts, we are proud to bring the highest quality products, meeting all the needs of professional billiard players.
              </p>
            </div>
            <div className="story-image">
              <img src="/assets/about/workshop.jpg" alt="SONIT CUSTOM Workshop" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <h2>Core Values</h2>
        <motion.div 
          className="values-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <motion.div 
              key={index}
              className="value-card"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div className="value-icon" style={{ backgroundColor: value.color }}>
                <span>{value.icon}</span>
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Milestones Section */}
      <section className="about-milestones">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >Development Journey</motion.h2>
        
        <div className="timeline">
          <motion.div 
            className="timeline-wrapper"
            ref={timelineRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 50
                }}
              >
                <motion.div 
                  className="timeline-icon"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.2,
                    type: "spring" 
                  }}
                >
                  {milestone.icon}
                </motion.div>
                
                <motion.div 
                  className="timeline-content"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.span 
                    className="year"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
                  >
                    {milestone.year}
                  </motion.span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="timeline-dots">
            {milestones.map((_, index) => (
              <motion.div
                key={index}
                className={`timeline-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => scrollToMilestone(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={index === activeIndex ? {
                  scale: [1, 1.3, 1.2],
                  transition: { duration: 0.5 }
                } : {}}
              />
            ))}
          </div>
          
          <div className="timeline-nav">
            <motion.button 
              className="nav-button"
              onClick={() => scrollTimeline('left')}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 201, 190, 0.2)" }}
              whileTap={{ scale: 0.9 }}
            >
              ←
            </motion.button>
            <motion.button 
              className="nav-button"
              onClick={() => scrollTimeline('right')}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 201, 190, 0.2)" }}
              whileTap={{ scale: 0.9 }}
            >
              →
            </motion.button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-contact">
        <motion.div 
          className="contact-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Contact Us</h2>
          <p>Let us help you find the perfect product</p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <p>+84 123 456 789</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <p>contact@sonitcustom.com</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <p>123 ABC Street, XYZ District, Ho Chi Minh City</p>
            </div>
          </div>
          <motion.button 
            className="contact-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#D4C9BE" }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Now
          </motion.button>
        </motion.div>
      </section>
      <ScrollToTop />
    </div>
  );
};

export default AboutUs;