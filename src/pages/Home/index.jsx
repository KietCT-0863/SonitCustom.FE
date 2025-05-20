import React from 'react';
import Hero from '../../components/Hero';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import ScrollToTop from '../../components/ScrollToTop';
import BlogSlider from '../../components/BlogSlider';
import './styles.css';

const HomePage = () => {
  // Featured products data with shorter, more mobile-friendly descriptions
  const featuredProducts = [
    {
      id: 1,
      name: 'Extender',
      categories: ['Premium', 'Custom'],
      image: '/assets/products/noi.png',
      description: 'Add power to your cue'
    },
    {
      id: 2,
      name: 'Bumper',
      categories: ['Custom', 'Accessories'],
      image: '/assets/products/bvc4.png',
      description: 'Custom bumper for Pro extensions'
    },
    {
      id: 3,
      name: 'Joint Protector',
      categories: ['Custom', 'Protection'],
      image: '/assets/products/bvr.jpg',
      description: 'Best protection for your cues'
    },
    {
      id: 4,
      name: 'Repair & Refinish',
      categories: ['Service', 'Maintenance'],
      image: '/assets/products/scc.jpg',
      description: 'Professional cue repair service'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-container">
        <HeaderContent />
        <Hero />
      </div>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-title">
            <h2>Featured Products</h2>
            <p>Discover our premium billiard accessories and services</p>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-overlay"></div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-categories">
                    {product.categories.map((category, index) => (
                      <span key={index}>{category}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Slider Section */}
      <BlogSlider />

      {/* Social Media Section */}
      <section className="social-media-section">
        <div className="container">
          <div className="section-title">
            <h2>Social Media</h2>
            <p>Connect with us and join our community</p>
          </div>
          
          <div className="social-media-content">
            <div className="social-links">
              <a href="https://www.facebook.com/sonitcustom/" target="_blank" rel="noopener noreferrer" className="social-link">
                <div className="social-icon facebook-icon">
                  <i className="fab fa-facebook-f"></i>
                </div>
                <span>Facebook Page</span>
              </a>
              <a href="https://www.facebook.com/groups/2648184928799088" target="_blank" rel="noopener noreferrer" className="social-link">
                <div className="social-icon facebook-group-icon">
                  <i className="fab fa-facebook"></i>
                </div>
                <span>Facebook Group</span>
              </a>
              <a href="https://www.tiktok.com/@sonit.cus" target="_blank" rel="noopener noreferrer" className="social-link">
                <div className="social-icon tiktok-icon">
                  <i className="fab fa-tiktok"></i>
                </div>
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default HomePage; 