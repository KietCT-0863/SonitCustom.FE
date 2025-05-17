import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollToTop from '../../components/ScrollToTop';
import './styles.css';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
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

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    orderNumber: '',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Support form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        orderNumber: '',
        message: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  return (
    <div className="support-page">
      <motion.div 
        className="page-banner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="banner-overlay"></div>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Customer Support
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          We're here to help with any questions you may have
        </motion.p>
      </motion.div>
      
      <div className="support-content">
        <motion.div 
          className="support-tabs"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.button 
            className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.button>
          <motion.button 
            className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            FAQ
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'contact' ? (
            <motion.div 
              key="contact"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="support-info"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="info-card"
                  variants={fadeIn}
                  whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="info-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <h3>Phone Support</h3>
                  <p>Call us Monday to Friday, 9am to 5pm</p>
                  <motion.a 
                    href="tel:+1234567890" 
                    className="contact-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +1 (234) 567-890
                  </motion.a>
                </motion.div>
                
                <motion.div 
                  className="info-card"
                  variants={fadeIn}
                  whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h3>Email Support</h3>
                  <p>We'll respond within 24 hours</p>
                  <motion.a 
                    href="mailto:support@sonitcustom.com" 
                    className="contact-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    support@sonitcustom.com
                  </motion.a>
                </motion.div>
                
                <motion.div 
                  className="info-card"
                  variants={fadeIn}
                  whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="info-icon">
                    <i className="fas fa-comments"></i>
                  </div>
                  <h3>Live Chat</h3>
                  <p>Chat with our support team in real-time</p>
                  <motion.button 
                    className="chat-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Start Chat
                  </motion.button>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="contact-form-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h2>Contact Us</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>
                
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div 
                      className="success-message"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                    >
                      <i className="fas fa-check-circle"></i>
                      <p>Thank you for your message! We'll respond shortly.</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      className="contact-form" 
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="name">Your Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="email">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="subject">Subject</label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select a subject</option>
                            <option value="order">Order Question</option>
                            <option value="product">Product Information</option>
                            <option value="shipping">Shipping & Delivery</option>
                            <option value="returns">Returns & Refunds</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="orderNumber">Order Number (Optional)</label>
                          <input
                            type="text"
                            id="orderNumber"
                            name="orderNumber"
                            value={formData.orderNumber}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      
                      <motion.button 
                        type="submit" 
                        className="submit-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send Message
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="faq"
              className="support-faq"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Frequently Asked Questions</h2>
              
              <motion.div 
                className="faq-list"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className={`faq-item ${expandedFaq === 0 ? 'expanded' : ''}`}
                  variants={fadeIn}
                  onClick={() => toggleFaq(0)}
                >
                  <div className="faq-header">
                    <h3>How long does shipping take?</h3>
                    <span className="faq-icon">{expandedFaq === 0 ? '−' : '+'}</span>
                  </div>
                  <AnimatePresence>
                    {expandedFaq === 0 && (
                      <motion.div 
                        className="faq-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>Standard shipping typically takes 3-5 business days within the continental US. International shipping may take 7-14 business days depending on the destination.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                <motion.div 
                  className={`faq-item ${expandedFaq === 1 ? 'expanded' : ''}`}
                  variants={fadeIn}
                  onClick={() => toggleFaq(1)}
                >
                  <div className="faq-header">
                    <h3>What is your return policy?</h3>
                    <span className="faq-icon">{expandedFaq === 1 ? '−' : '+'}</span>
                  </div>
                  <AnimatePresence>
                    {expandedFaq === 1 && (
                      <motion.div 
                        className="faq-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>We offer a 30-day return policy for most items. Custom orders may not be eligible for returns unless there's a manufacturing defect.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                <motion.div 
                  className={`faq-item ${expandedFaq === 2 ? 'expanded' : ''}`}
                  variants={fadeIn}
                  onClick={() => toggleFaq(2)}
                >
                  <div className="faq-header">
                    <h3>How do I track my order?</h3>
                    <span className="faq-icon">{expandedFaq === 2 ? '−' : '+'}</span>
                  </div>
                  <AnimatePresence>
                    {expandedFaq === 2 && (
                      <motion.div 
                        className="faq-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>Once your order ships, you'll receive a tracking number via email. You can also view your order status by logging into your account.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                <motion.div 
                  className={`faq-item ${expandedFaq === 3 ? 'expanded' : ''}`}
                  variants={fadeIn}
                  onClick={() => toggleFaq(3)}
                >
                  <div className="faq-header">
                    <h3>Do you offer custom designs?</h3>
                    <span className="faq-icon">{expandedFaq === 3 ? '−' : '+'}</span>
                  </div>
                  <AnimatePresence>
                    {expandedFaq === 3 && (
                      <motion.div 
                        className="faq-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>Yes, we specialize in custom billiard equipment. Please contact us directly to discuss your custom requirements.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <ScrollToTop />
    </div>
  );
};

export default SupportPage; 