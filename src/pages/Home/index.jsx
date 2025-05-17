import React from 'react';
import Hero from '../../components/Hero';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import ScrollToTop from '../../components/ScrollToTop';
import './styles.css';

const HomePage = () => {
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: 'Extender',
      categories: ['Premium', 'Custom'],
      image: '/assets/products/noi.png',
      description: 'Add power to your cue with the Custom Extender'
    },
    {
      id: 2,
      name: 'Bumper',
      categories: ['Custom', 'Accessories'],
      image: '/assets/products/bvc4.png',
      description: 'The custom bumper for cues which attaches to Pro Telescopic Extension'
    },
    {
      id: 3,
      name: 'Joint Protector',
      categories: ['Custom', 'Protection'],
      image: '/assets/products/bvr.jpg',
      description: 'Custom Joint protectors provide the best protection for your favorite Cues'
    },
    {
      id: 4,
      name: 'Repair and Refinishing',
      categories: ['Service', 'Maintenance'],
      image: '/assets/products/scc.jpg',
      description: 'Professional service that repairs and renews billiard cues'
    }
  ];

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Custom Cue Craftsmanship',
      date: 'Mar 28, 2024',
      description: 'The balance, weight, and feel of a custom cue is paramount to a player\'s success. Our craftsmen meticulously design every component to ensure optimal performance.',
      image: '/assets/blog/post1.jpg',
      tags: ['SonitSharing', 'CustomCue', 'Craftsmanship']
    },
    {
      id: 2,
      title: 'Exotic Woods in Custom Billiard Cues',
      date: 'Feb 19, 2024',
      description: 'From Cocobolo to Bocote, we explore the finest exotic woods used in creating stunning custom billiard cues that not only perform flawlessly but become conversation pieces.',
      image: '/assets/blog/post2.jpg',
      tags: ['SonitSharing', 'ExoticWoods', 'CustomCue']
    },
    {
      id: 3,
      title: 'Inlay Techniques for Premium Cues',
      date: 'Jan 8, 2024',
      description: 'Our artisans have perfected various inlay techniques using materials like mother-of-pearl, abalone, and precious metals to create distinctive patterns that set our custom cues apart.',
      image: '/assets/blog/post3.jpg',
      tags: ['SonitSharing', 'InlayTechniques', 'PremiumCues']
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

      {/* Blog Section */}
      <section className="blog-section">
        <div className="container">
          <div className="section-title">
            <h2>Blog</h2>
            <p>Discover the artistry and craftsmanship behind our custom billiard cues!<br />Explore our insights, techniques, and innovations.</p>
            <a href="/blog" className="view-all">View all articles</a>
          </div>
          
          <div className="blog-grid">
            {blogPosts.map(post => (
              <div className="blog-card" key={post.id}>
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <div className="blog-date">{post.date}</div>
                  <p>{post.description}</p>
                  <div className="blog-tags">
                    {post.tags.map((tag, index) => (
                      <span key={index}>#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default HomePage; 