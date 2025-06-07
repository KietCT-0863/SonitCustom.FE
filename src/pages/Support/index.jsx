import React, { useState } from 'react';
import ScrollToTop from '../../components/ScrollToTop';
import './styles.css';

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
    console.log('Support form submitted:', formData);
    setSubmitted(true);
    
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
      <section 
        className="page-banner"
      >
        <div className="banner-overlay"></div>
        <h1>
          Customer Support
        </h1>
        <p>
          We're here to help with any questions you may have
        </p>
      </section>
      
      <div className="support-content">
        <div 
          className="support-tabs"
        >
          <button 
            className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Us
          </button>
          <button 
            className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
        </div>

        {
          activeTab === 'contact' ? (
            <div 
              key="contact"
            >
              <div 
                className="support-info"
              >
                <div 
                  className="info-card"
                >
                  <div className="info-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <h3>Phone Support</h3>
                  <p>Call us Monday to Friday, 9am to 5pm</p>
                  <a 
                    href="tel:+1234567890" 
                    className="contact-link"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
                
                <div 
                  className="info-card"
                >
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h3>Email Support</h3>
                  <p>We'll respond within 24 hours</p>
                  <a 
                    href="mailto:support@sonitcustom.com" 
                    className="contact-link"
                  >
                    support@sonitcustom.com
                  </a>
                </div>
                
                <div 
                  className="info-card"
                >
                  <div className="info-icon">
                    <i className="fas fa-comments"></i>
                  </div>
                  <h3>Live Chat</h3>
                  <p>Chat with our support team in real-time</p>
                  <button 
                    className="chat-button"
                  >
                    Start Chat
                  </button>
                </div>
              </div>
              
              <div 
                className="contact-form-container"
              >
                <h2>Contact Us</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>
                
                  {submitted ? (
                    <div 
                      className="success-message"
                    >
                      <i className="fas fa-check-circle"></i>
                      <p>Thank you for your message! We'll respond shortly.</p>
                    </div>
                  ) : (
                    <form 
                      className="contact-form" 
                      onSubmit={handleSubmit}
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
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          />
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
                        <label htmlFor="message">Your Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="5"
                          required
                        ></textarea>
                      </div>
                      
                      <button type="submit" className="submit-button">
                        Send Message
                      </button>
                    </form>
                  )}
              </div>
            </div>
          ) : (
            <div key="faq">
              <div className="support-faq">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                  {[
                    {
                      question: "How do I place an order?",
                      answer: "You can place an order directly through our website by browsing our product catalog, adding items to your cart, and proceeding to checkout."
                    },
                    {
                      question: "What payment methods do you accept?",
                      answer: "We accept major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers."
                    },
                    {
                      question: "Do you offer international shipping?",
                      answer: "Yes, we offer international shipping to most countries. Shipping costs and delivery times vary by destination."
                    },
                    {
                      question: "Can I customize my cue?",
                      answer: "Absolutely! We specialize in custom cues. Please contact our support team to discuss your customization options."
                    },
                    {
                      question: "What is your return policy?",
                      answer: "We offer a 30-day return policy on all non-customized products. Please visit our Returns page for more details."
                    },
                    {
                      question: "How can I track my order?",
                      answer: "Once your order is shipped, you will receive an email with a tracking number. You can use this number on our website or the courier's website to track your package."
                    }
                  ].map((faq, index) => (
                    <div 
                      key={index} 
                      className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                      onClick={() => toggleFaq(index)}
                    >
                      <div className="faq-header">
                        <h3>{faq.question}</h3>
                        <span className="faq-icon">
                          {expandedFaq === index ? '−' : '+'}
                        </span>
                      </div>
                      {
                        expandedFaq === index && (
                          <div className="faq-content">
                            <p>{faq.answer}</p>
                          </div>
                        )
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }
      </div>
      <ScrollToTop />
    </div>
  );
};

export default SupportPage; 