import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { ProductCard } from '../../components/ProductsPage/ProductCard';

const CueDetail = () => {
  // 1. State hooks first
  const { id } = useParams();
  const navigate = useNavigate();

  const [cue, setCue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTab, setSelectedTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // Mock data - in reality would be fetched from API
  const cueData = {
    id: id,
    name: 'EXCEED PRO CUE',
    category: 'professional',
    images: [
      '/images/cues/exceed-pro-1.jpg',
      '/images/cues/exceed-pro-2.jpg',
      '/images/cues/exceed-pro-3.jpg'
    ],
    colors: ['#223344', '#664422', '#FFFFFF'],
    price: 1299.99,
    discount: 10,
    shortDescription: 'Professional tournament-grade cue with precision engineering',
    description: 'The EXCEED PRO CUE represents the pinnacle of cue craftsmanship. Designed for professional players who demand ultimate performance and consistency. Features our proprietary carbon fiber core and advanced joint system for perfect energy transfer.',
    features: [
      'Carbon fiber reinforced shaft for ultimate performance',
      'Premium North American maple construction',
      'Advanced joint system for perfect energy transfer',
      'CNC precision manufacturing for consistent play',
      'Custom weight adjustment system'
    ],
    specs: {
      Material: 'North American Maple & Carbon Fiber',
      Length: '58 inches',
      Weight: '19-21 oz (adjustable)',
      Tip: 'Exceed Pro Soft Medium (12.5mm)',
      Warranty: 'Lifetime'
    },
    status: 'In Stock'
  };
  
  const mockRelatedProducts = [
    {
      id: 'pro-1',
      name: 'EXCEED ELITE CUE',
      category: 'professional',
      image: '/images/cues/exceed-elite.jpg',
      price: 899.99,
      path: '/products/cues/professional/pro-1',
      status: 'In Stock',
      colors: ['#223344', '#664422'],
      discount: 0,
      isNew: true
    },
    {
      id: 'pro-2',
      name: 'EXCEED CARBON CUE',
      category: 'professional',
      image: '/images/cues/exceed-carbon.jpg',
      price: 1099.99,
      path: '/products/cues/professional/pro-2',
      status: 'In Stock',
      colors: ['#000000', '#3366CC'],
      discount: 5,
      isNew: false
    }
  ];
  
  useEffect(() => {
    // Simulate API call to get product details
    setLoading(true);
    setTimeout(() => {
      setCue(cueData);
      setSelectedImage(cueData.images[0]);
      setSelectedColor(cueData.colors[0]);
      setRelatedProducts(mockRelatedProducts);
      setLoading(false);
    }, 500);
  }, [id]);
  
  // 3. Handler functions
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  
  const handleRelatedProductClick = (path) => {
    navigate(path);
  };
  
  // 4. Return JSX
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (!cue) {
    return (
      <div className="not-found">
        <h2>Product Not Found</h2>
        <a href="/products/cues" className="back-link">
          Back to Cues
        </a>
      </div>
    );
  }
  
  // Calculate final price after discount if any
  const finalPrice = cue.discount 
    ? cue.price * (1 - cue.discount / 100) 
    : cue.price;
  
  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="back-button-container">
          <button className="back-button" onClick={handleBack}>
            <i className="fas fa-arrow-left"></i> Back
          </button>
        </div>
      </div>
      
      <div className="product-detail-container">
        <div className="product-detail-left">
          <div className="product-main-image">
            <img src={selectedImage} alt={cue.name} />
          </div>
          <div className="product-thumbnails">
            {cue.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                onClick={() => handleImageClick(image)}
              >
                <img src={image} alt={`${cue.name} ${index+1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="product-detail-right">
          <h1 className="product-title">{cue.name}</h1>
          
          <div className="product-price-container">
            {cue.discount > 0 && (
              <span className="original-price">${cue.price.toFixed(2)}</span>
            )}
            <span className="final-price">${finalPrice.toFixed(2)}</span>
            {cue.discount > 0 && (
              <span className="discount-tag">-{cue.discount}%</span>
            )}
          </div>
          
          <div className="product-status">{cue.status}</div>
          
          <p className="product-short-description">{cue.shortDescription}</p>
          
          <div className="color-selection">
            <h3>Color</h3>
            <div className="color-options">
              {cue.colors.map((color, index) => (
                <div 
                  key={index} 
                  className={`color-option ${selectedColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="quantity-selector">
            <h3>Quantity</h3>
            <div className="quantity-control">
              <button className="qty-btn dec" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
              <input type="number" min="1" value={quantity} readOnly />
              <button className="qty-btn inc" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
          
          <div className="product-actions">
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="wishlist-btn">Add to Wishlist</button>
          </div>
        </div>
      </div>
      
      <div className="product-details-tabs">
        <div className="tabs-header">
          <div 
            className={`tab ${selectedTab === 'description' ? 'active' : ''}`}
            onClick={() => handleTabClick('description')}
          >
            Description
          </div>
          <div 
            className={`tab ${selectedTab === 'features' ? 'active' : ''}`}
            onClick={() => handleTabClick('features')}
          >
            Features
          </div>
          <div 
            className={`tab ${selectedTab === 'specifications' ? 'active' : ''}`}
            onClick={() => handleTabClick('specifications')}
          >
            Specifications
          </div>
        </div>
        
        <div className="tab-content">
          {selectedTab === 'description' && (
            <div className="description-tab">
              <p>{cue.description}</p>
            </div>
          )}
          
          {selectedTab === 'features' && (
            <div className="features-tab">
              <ul className="features-list">
                {cue.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {selectedTab === 'specifications' && (
            <div className="specifications-tab">
              <table className="specs-table">
                <tbody>
                  {Object.entries(cue.specs).map(([key, value], index) => (
                    <tr key={index}>
                      <th>{key}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      <div className="related-products-section">
        <div className="container">
          <h2>Related Products</h2>
          <div className="related-products-grid">
            {relatedProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onClick={() => handleRelatedProductClick(product.path)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CueDetail; 