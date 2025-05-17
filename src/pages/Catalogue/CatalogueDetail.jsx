import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop';
import './styles.css';

const CatalogueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // Mock product data
  const productData = {
    id: 'apex',
    name: 'APEX',
    category: 'RING',
    brand: 'Sonit Custom',
    version: 'Prima v1.5',
    maker: 'Sonit Design',
    images: [
      '/assets/products/apex/1.jpg',
      '/assets/products/apex/2.jpg',
      '/assets/products/apex/3.jpg',
      '/assets/products/apex/4.jpg',
      '/assets/products/apex/5.jpg',
    ],
    price: 259.00,
    status: 'IN STOCK',
    raffleInfo: {
      cart: 'FREE SHIPPING FOR ORDERS OVER $300',
      form: 'CUSTOM SIZING AVAILABLE',
      check: 'CHECK YOUR EMAIL FOR ORDER CONFIRMATION',
      expected: 'Expected Shipping Date: Oct 15, 2023'
    },
    colors: [
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Gunmetal', hex: '#2C3539' },
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Black', hex: '#000000' },
      { name: 'Bronze', hex: '#CD7F32' },
    ],
    specifications: {
      material: 'Titanium Grade 5',
      weight: '8.2g',
      size: 'US 7-12 Available',
      design: 'Minimal, Geometric',
      finish: 'Brushed & Polished',
      edition: 'Limited Edition 2023'
    },
    raffleRules: [
      {
        title: 'Free shipping on all orders over $300',
        description: 'International shipping available at additional cost.'
      },
      {
        title: 'Custom sizing available upon request',
        description: 'Please contact us for custom sizing needs.'
      },
      {
        title: 'Each ring is hand-finished to perfection',
        description: 'Minor variations in finish are a sign of handcrafted quality.'
      },
      {
        title: 'Limited edition designs',
        description: 'Once sold out, these designs will not be reproduced.'
      },
      {
        title: '30-day satisfaction guarantee',
        description: 'If you are not completely satisfied, returns accepted within 30 days.'
      },
      {
        title: 'Lifetime warranty against manufacturing defects',
        description: 'Each ring comes with our promise of quality and durability.'
      },
    ]
  };
  
  // Dữ liệu mẫu cho sản phẩm billiard
  const billiardProductData = {
    id: 'predator-ikon-4-1',
    name: 'PREDATOR IKON 4-1',
    category: 'BILLIARD',
    brand: 'Predator',
    version: 'Ikon 4-1',
    maker: 'Predator Cues',
    images: [
      '/assets/products/billiard/predator-ikon-4-1/1.jpg',
      '/assets/products/billiard/predator-ikon-4-1/2.jpg',
      '/assets/products/billiard/predator-ikon-4-1/3.jpg',
      '/assets/products/billiard/predator-ikon-4-1/4.jpg',
      '/assets/products/billiard/predator-ikon-4-1/5.jpg',
    ],
    price: 990.00,
    status: 'IN STOCK',
    raffleInfo: {
      cart: 'FREE SHIPPING ON ORDERS OVER $1000',
      form: 'CUSTOM WEIGHT OPTIONS AVAILABLE',
      check: 'CHECK YOUR EMAIL FOR ORDER CONFIRMATION',
      expected: 'Expected Shipping Date: Oct 10, 2023'
    },
    colors: [
      { name: 'Blue', hex: '#0066CC' },
      { name: 'Black', hex: '#000000' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    specifications: {
      brand: 'Predator',
      model: 'Ikon 4-1',
      shaft: 'Carbon X Fiber',
      tip: 'Z3 Technology',
      weight: '18.5oz',
      diameter: '12.75mm'
    },
    raffleRules: [
      {
        title: 'Free shipping on all orders over $1000',
        description: 'International shipping available at additional cost.'
      },
      {
        title: 'Custom weight options available upon request',
        description: 'Please contact us for custom weight specifications.'
      },
      {
        title: 'Each cue is professionally tested before shipping',
        description: 'Quality assurance guaranteed on all Predator cues.'
      },
      {
        title: 'Limited stock available',
        description: 'Premium models sell out quickly, order while supplies last.'
      },
      {
        title: '30-day satisfaction guarantee',
        description: 'If you are not completely satisfied, returns accepted within 30 days.'
      },
      {
        title: 'Lifetime warranty against manufacturing defects',
        description: 'Each cue comes with Predator\'s warranty of quality and craftsmanship.'
      },
    ]
  };
  
  // Mock related products
  const mockRelatedProducts = [
    {
      id: 'artemis',
      name: 'ARTEMIS',
      maker: 'Sonit Design',
      image: '/assets/products/artemis.jpg',
      category: 'RING',
      price: 279,
      status: 'IN STOCK'
    },
    {
      id: 'jaws',
      name: 'JAWS',
      maker: 'Sonit Design',
      image: '/assets/products/jaws.jpg',
      category: 'RING',
      price: 249,
      status: 'IN STOCK'
    },
    {
      id: 'phantom',
      name: 'PHANTOM',
      maker: 'Sonit Design',
      image: '/assets/products/phantom.jpg',
      category: 'RING',
      price: 289,
      status: 'LIMITED STOCK'
    },
    {
      id: 'prowler',
      name: 'PROWLER',
      maker: 'Sonit Design',
      image: '/assets/products/prowler.jpg',
      category: 'RING',
      price: 259,
      status: 'IN STOCK'
    }
  ];

  // Mock related billiard products
  const mockRelatedBilliardProducts = [
    {
      id: 'mezz-ec7-kl',
      name: 'MEZZ EC7-KL',
      maker: 'Mezz Cues',
      image: '/assets/products/billiard/mezz-ec7-kl.jpg',
      category: 'BILLIARD',
      price: 750,
      status: 'IN STOCK'
    },
    {
      id: 'brunswick-gold-crown',
      name: 'BRUNSWICK GOLD CROWN VI',
      maker: 'Brunswick',
      image: '/assets/products/billiard/brunswick-gold-crown.jpg',
      category: 'BILLIARD',
      price: 12500,
      status: 'CUSTOM ORDER'
    },
    {
      id: 'kamui-black-chalk',
      name: 'KAMUI BLACK CHALK',
      maker: 'Kamui',
      image: '/assets/products/billiard/kamui-black-chalk.jpg',
      category: 'BILLIARD',
      price: 25,
      status: 'IN STOCK'
    },
    {
      id: 'predator-panthera',
      name: 'PREDATOR PANTHERA',
      maker: 'Predator Cues',
      image: '/assets/products/billiard/predator-panthera.jpg',
      category: 'BILLIARD',
      price: 1200,
      status: 'LIMITED STOCK'
    }
  ];
  
  // Simulate data loading
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      // Kiểm tra ID để xác định sản phẩm billiard hay ring
      if (id && id.startsWith('b')) {
        setProduct(billiardProductData);
        setRelatedProducts(mockRelatedBilliardProducts);
      } else {
        setProduct(productData);
        setRelatedProducts(mockRelatedProducts);
      }
      setLoading(false);
    }, 800);
  }, [id]);
  
  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };
  
  if (loading) {
    return (
      <div className="store-detail-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="not-found">
        <h2>Product Not Found</h2>
        <Link to="/catalogue" className="back-link">
          Back to Catalogue
        </Link>
      </div>
    );
  }
  
  return (
    <div className="store-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">HOME</Link> &gt; <Link to="/catalogue">CATALOGUE</Link> &gt; <span>{product.name}</span>
      </div>
      
      {/* Product Detail Section */}
      <div className="product-detail-container">
        {/* Left side - Main Image */}
        <div className="product-detail-left">
          <div className="product-main-image">
            <img src={product.images[selectedImage]} alt={product.name} />
            <div className="product-brand-watermark"></div>
          </div>
        </div>
        
        {/* Right side - Thumbnails and Product Info */}
        <div className="product-detail-right">
          {/* Thumbnails */}
          <div className="product-thumbnails-vertical">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={image} alt={`${product.name} ${index+1}`} />
              </div>
            ))}
          </div>
          
          {/* Product Info */}
          <div className="product-info-panel">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-brand">{product.brand} | {product.version} | {product.maker}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            
            {/* Raffle Information */}
            <div className="raffle-info">
              <ul>
                <li>{product.raffleInfo.cart}</li>
                <li>{product.raffleInfo.form}</li>
                <li>{product.raffleInfo.check}</li>
              </ul>
              <p className="shipping-date">{product.raffleInfo.expected}</p>
            </div>
            
            {/* Available Colors */}
            <div className="available-colors">
              <h3>AVAILABLE COLORS</h3>
              <div className="color-swatches">
                {product.colors.map((color, index) => (
                  <div 
                    key={index} 
                    className="color-swatch"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Product Status Button */}
            <div className="product-status-button">
              <button className="raffle-status">{product.status}</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Raffle Rules Section */}
      <div className="raffle-rules-section">
        <h2 className="section-title">RULES & INFORMATION</h2>
        <div className="rules-divider"></div>
        
        <div className="raffle-rules-grid">
          {product.raffleRules.map((rule, index) => (
            <div key={index} className="raffle-rule-item">
              <div className="rule-icon">
                <div className="rule-icon-inner"></div>
              </div>
              <div className="rule-content">
                <h3>{rule.title}</h3>
                <p>{rule.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Specifications Section */}
      <div className="product-specs-section">
        <h2 className="section-title">SPECIFICATIONS</h2>
        <div className="specs-divider"></div>
        
        <div className="product-specs-table">
          {Object.entries(product.specifications).map(([key, value], index) => (
            <div key={index} className="specs-row">
              <div className="specs-key">{key.toUpperCase()}</div>
              <div className="specs-value">{value}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Related Products Section */}
      <div className="related-products-section">
        <h2 className="section-title">YOU MAY ALSO LIKE</h2>
        
        <div className="related-products-grid">
          {relatedProducts.map((product) => (
            <Link 
              key={product.id}
              to={product.category === 'BILLIARD' 
                ? `/catalogue/b${product.id.split('-')[1]}` 
                : `/catalogue/${product.id}`}
              className="related-product-card"
            >
              <div className="related-product-image">
                <img src={product.image} alt={product.name} />
                <button className="bookmark-btn">
                  <span className="bookmark-icon">★</span>
                </button>
              </div>
              <div className="related-product-info">
                <h3 className="related-product-name">{product.name}</h3>
                <p className="related-product-maker">{product.maker}</p>
                <div className="related-product-price-row">
                  <span className="related-product-price">${product.price}</span>
                  <span className="related-product-status">{product.status}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <ScrollToTop />
    </div>
  );
};

export default CatalogueDetail; 