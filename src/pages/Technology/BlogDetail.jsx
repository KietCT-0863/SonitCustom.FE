import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import './blogDetail.css';



const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('description');

  
  const blogPostsDetails = [
    {
      id: 1,
      title: 'Advanced EX Pro Shaft Technology',
      category: 'shaft',
      date: '2023-12-15',
      image: '/assets/shaft-tech.jpg',
      author: {
        name: 'Alex Nguyen',
        avatar: '/assets/author1.jpg',
        role: 'Technical Director'
      },
      content: `<p>The EX Pro shaft represents the pinnacle of our technological advancement in cue engineering. After years of research and development, we've created a shaft that combines traditional craftsmanship with cutting-edge materials science.</p>
            
            <h2>Carbon Fiber Reinforcement</h2>
            <p>At the core of the EX Pro is our proprietary carbon fiber reinforcement system. Unlike conventional shafts that rely solely on wood properties, we've integrated a precision-engineered carbon fiber core that provides exceptional stability without compromising feel.</p>
            
            <p>The carbon fiber elements are strategically positioned to minimize deflection while maintaining the natural feedback that players expect from high-quality equipment. This structural innovation results in a shaft that stays straight even under the most demanding playing conditions.</p>
            
            <h2>Multi-Layer Construction</h2>
            <p>The EX Pro features our revolutionary multi-layer construction technique, where each layer serves a specific purpose:</p>
            
            <ul>
              <li><strong>Core layer:</strong> Carbon fiber reinforced spine for stability and consistent performance</li>
              <li><strong>Middle layer:</strong> Specially treated maple wood for traditional feel and vibration dampening</li>
              <li><strong>Outer layer:</strong> Premium-grade North American hard maple, hand-selected for grain quality and density</li>
            </ul>
            
            <p>This combination creates a shaft that offers the best of both worlds: modern performance advantages with the familiar feel that professionals demand.</p>
            
            <h2>Precision Manufacturing</h2>
            <img src="/assets/ex-pro-manufacturing.jpg" alt="EX Pro Manufacturing Process" class="content-image" />
            <p>Each EX Pro shaft undergoes a 23-step manufacturing process, including multiple stages of curing and conditioning. Our proprietary vacuum-pressing technology ensures perfect adhesion between layers, eliminating air pockets and inconsistencies that plague lesser quality shafts.</p>
            
            <p>The final product undergoes rigorous testing on our custom-built deflection measurement system, with only shafts meeting our strict specifications making it to market. This attention to detail is why professional players worldwide trust the EX Pro for tournament play.</p>
            
            <h2>Performance Benefits</h2>
            <p>Players using the EX Pro shaft report significant improvements in several key areas:</p>
            
            <ul>
              <li>Reduced deflection on off-center hits</li>
              <li>More consistent power transfer</li>
              <li>Improved accuracy on draw shots</li>
              <li>Enhanced feel for precise speed control</li>
              <li>Superior durability under tournament conditions</li>
            </ul>
            
            <p>The EX Pro shaft technology continues to evolve as we refine our manufacturing processes and incorporate feedback from top players around the world. This commitment to continuous improvement ensures that Sonit Custom remains at the forefront of cue technology innovation.</p>`,
      keyTakeaways: [
        'Carbon fiber core technology for optimal performance',
        'Three-layer construction balances stability and feel',
        '23-step precision manufacturing process',
        'Reduced deflection for improved accuracy',
        'Continuously evolving based on professional player feedback'
      ],
      specs: {
        manufacturer: 'Sonit Custom',
        material: 'Carbon Fiber & North American Maple',
        diameterRange: '11.75mm - 13mm',
        weight: '90-120g',
        taper: 'Pro Taper'
      },
      relatedPosts: [2, 3, 6]
    },
    {
      id: 2,
      title: 'G-Core System: Perfect Balance and Control',
      category: 'shaft',
      date: '2023-11-20',
      image: '/assets/g-core.jpg',
      author: {
        name: 'Sarah Tran',
        avatar: '/assets/author2.jpg',
        role: 'Engineering Lead'
      },
      content: `<p>Our G-Core system represents a breakthrough in shaft technology, combining graphite reinforcement with traditional wood craftsmanship. This article explores the technical aspects and playing benefits of this innovative design.</p>`,
      keyTakeaways: ['Graphite reinforcement for increased stability', 'Traditional wood feel maintained'],
      specs: {
        manufacturer: 'Sonit Custom',
        material: 'Graphite & Maple',
        diameterRange: '12mm - 13mm',
        weight: '95-115g'
      },
      relatedPosts: [1, 3, 5]
    },
    {
      id: 3,
      title: 'Exceed Butt Technology Innovation',
      category: 'butt',
      date: '2023-10-05',
      image: '/assets/butt-tech.jpg',
      author: {
        name: 'Daniel Lee',
        avatar: '/assets/author3.jpg',
        role: 'Product Designer'
      },
      content: `<p>The butt section of a cue is often overlooked, but at Sonit Custom, we've revolutionized butt technology to enhance overall performance. Learn about our weight distribution system and vibration dampening techniques.</p>`,
      keyTakeaways: ['Advanced weight distribution system', 'Vibration dampening technology'],
      specs: {
        manufacturer: 'Sonit Custom',
        material: 'Premium Maple & Composite Materials',
        weight: '350-450g'
      },
      relatedPosts: [1, 5, 6]
    },
    {
      id: 4,
      title: 'Manufacturing Excellence: Inside Our Factory',
      category: 'manufacturing',
      date: '2023-09-12',
      image: '/assets/cue-factory.jpg',
      author: {
        name: 'Michael Pham',
        avatar: '/assets/author4.jpg',
        role: 'Factory Manager'
      },
      content: `<p>Take a virtual tour of our state-of-the-art manufacturing facility where traditional craftsmanship meets modern technology. This behind-the-scenes look reveals our commitment to quality control and precision.</p>`,
      keyTakeaways: ['Blend of traditional craftsmanship and modern technology', 'Strict quality control standards'],
      specs: {
        facility: 'State-of-the-art 50,000 sq ft facility',
        equipment: 'CNC machines & traditional hand tools',
        capacity: '1000 cues per month'
      },
      relatedPosts: [5, 6, 1]
    },
    {
      id: 5,
      title: 'Material Science: Wood Selection Secrets',
      category: 'materials',
      date: '2023-08-28',
      image: '/assets/wood-selection.jpg',
      author: {
        name: 'Emily Nguyen',
        avatar: '/assets/author5.jpg',
        role: 'Materials Specialist'
      },
      content: `<p>The selection of wood is crucial to creating high-performance cues. This detailed guide explains our wood sourcing, aging process, and the scientific testing we conduct to ensure only the finest materials make it into our products.</p>`,
      keyTakeaways: ['Rigorous wood selection process', 'Scientific density and moisture testing', 'Proprietary aging methods'],
      specs: {
        woodTypes: 'North American Hard Maple, Cocobolo, Purpleheart, Bocote',
        agingPeriod: '3-5 years minimum',
        grading: 'Proprietary 10-point system'
      },
      relatedPosts: [3, 4, 6]
    },
    {
      id: 6,
      title: 'Innovation in Joint Systems',
      category: 'joints',
      date: '2023-07-15',
      image: '/assets/joint-systems.jpg',
      author: {
        name: 'James Do',
        avatar: '/assets/author6.jpg',
        role: 'R&D Manager'
      },
      content: `<p>The joint is where science meets art in cue design. Our proprietary joint systems provide perfect alignment and energy transfer while maintaining the feel players demand. Discover the engineering behind our revolutionary joint designs.</p>`,
      keyTakeaways: ['Perfect alignment technology', 'Enhanced energy transfer', 'Multiple joint options for different play styles'],
      specs: {
        types: 'Stainless Steel, Titanium, Wood-to-Wood',
        threadPitch: 'Precision 5/16 x 18',
        alignmentSystem: 'Radial Perfection™ Technology'
      },
      relatedPosts: [1, 2, 3]
    }
  ];

  useEffect(() => {
    // Simulate loading data from API
    setLoading(true);
    setTimeout(() => {
      const foundPost = blogPostsDetails.find(post => post.id === parseInt(id));
      setPost(foundPost);
      setLoading(false);
    }, 500);
  }, [id]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get related posts
  const getRelatedPosts = () => {
    if (!post) return [];
    return post.relatedPosts.map(relatedId => 
      blogPostsDetails.find(p => p.id === relatedId)
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRelatedPostClick = (postId) => {
    navigate(`/technology/blog/${postId}`);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const getCategoryName = (category) => {
    switch (category) {
      case 'shaft': return 'Shaft Technology';
      case 'butt': return 'Butt Technology';
      case 'manufacturing': return 'Manufacturing';
      case 'materials': return 'Materials';
      case 'joints': return 'Joint Systems';
      default: return category;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="not-found">
        <h2>Blog post not found</h2>
        <Link to="/technology" className="back-link">
          Back to Technology
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page blog-detail-page">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>
      
      <div className="product-detail-container blog-detail-container">
        <div className="product-detail-left blog-detail-left">
          <div className="product-main-image blog-featured-image">
            <img src={post.image} alt={post.title} />
          </div>
        </div>
        
        <div className="product-detail-right blog-detail-right">
          <h1 className="product-title blog-title">{post.title}</h1>
          
          <div className="blog-meta">
            <div className="author-info">
              <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
              <div className="author-details">
                <span className="author-name">{post.author.name}</span>
                <span className="author-role">{post.author.role}</span>
              </div>
            </div>
            <div className="post-info">
              <span className="post-date">{formatDate(post.date)}</span>
              <span className="post-category">Category: {getCategoryName(post.category)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="product-details-tabs blog-details-tabs">
        <div className="tabs-header">
          <div 
            className={`tab ${selectedTab === 'description' ? 'active' : ''}`}
            onClick={() => handleTabClick('description')}
          >
            Description
          </div>
          {post.keyTakeaways && (
            <div 
              className={`tab ${selectedTab === 'features' ? 'active' : ''}`}
              onClick={() => handleTabClick('features')}
            >
              Key Features
            </div>
          )}
          {post.specs && (
            <div 
              className={`tab ${selectedTab === 'specifications' ? 'active' : ''}`}
              onClick={() => handleTabClick('specifications')}
            >
              Specifications
            </div>
          )}
        </div>
        
        <div className="tab-content">
          {selectedTab === 'description' && (
            <div className="description-tab blog-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          )}
          
          {selectedTab === 'features' && post.keyTakeaways && (
            <div className="features-tab">
              <ul className="key-takeaways-list">
                {post.keyTakeaways.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {selectedTab === 'specifications' && post.specs && (
            <div className="specifications-tab">
              <table className="specs-table">
                <tbody>
                  {Object.entries(post.specs).map(([key, value], index) => (
                    <tr key={index}>
                      <th>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      <div className="related-products-section related-posts-section">
        <h2>Related Articles</h2>
        <div className="related-products-grid related-posts-grid">
          {getRelatedPosts().map(relatedPost => (
            <div 
              key={relatedPost.id} 
              className="related-card"
              onClick={() => handleRelatedPostClick(relatedPost.id)}
            >
              <div className="related-image">
                <img src={relatedPost.image} alt={relatedPost.title} />
              </div>
              <div className="related-content">
                <h4>{relatedPost.title}</h4>
                <span className="related-date">{formatDate(relatedPost.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 