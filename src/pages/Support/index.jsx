import React, { useState } from 'react';
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
  
  return (
    <div className="support-page">
      <div className="page-banner">
        <h1>Customer Support</h1>
        <p>We're here to help with any questions you may have</p>
      </div>
      
      <div className="support-content">
        <div className="support-info">
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>Phone Support</h3>
            <p>Call us Monday to Friday, 9am to 5pm</p>
            <a href="tel:+1234567890" className="contact-link">+1 (234) 567-890</a>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email Support</h3>
            <p>We'll respond within 24 hours</p>
            <a href="mailto:support@sonitcustom.com" className="contact-link">support@sonitcustom.com</a>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>Live Chat</h3>
            <p>Chat with our support team in real-time</p>
            <button className="chat-button">Start Chat</button>
          </div>
        </div>
        
        <div className="support-faq">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-item">
            <h3>How long does shipping take?</h3>
            <p>Standard shipping typically takes 3-5 business days within the continental US. International shipping may take 7-14 business days depending on the destination.</p>
          </div>
          
          <div className="faq-item">
            <h3>What is your return policy?</h3>
            <p>We offer a 30-day return policy for most items. Custom orders may not be eligible for returns unless there's a manufacturing defect.</p>
          </div>
          
          <div className="faq-item">
            <h3>How do I track my order?</h3>
            <p>Once your order ships, you'll receive a tracking number via email. You can also view your order status by logging into your account.</p>
          </div>
          
          <div className="faq-item">
            <h3>Do you offer custom designs?</h3>
            <p>Yes, we specialize in custom billiard equipment. Please contact us directly to discuss your custom requirements.</p>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>Contact Us</h2>
          <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          
          {submitted ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <p>Thank you for your message! We'll respond shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
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
              
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 