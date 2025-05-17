import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './styles.css';

const StoreDetail = () => {
  const { id, category } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  
  // Mock product data
  const productData = {
    id: 'lotus-prince',
    name: 'Lotus Prince',
    category: 'artisan-keycap',
    brand: 'Sirius',
    version: 'Prima v1.5',
    maker: 'Evolay',
    images: [
      '/assets/products/lotus-prince/main.jpg',
      '/assets/products/lotus-prince/angle1.jpg',
      '/assets/products/lotus-prince/angle2.jpg',
      '/assets/products/lotus-prince/angle3.jpg',
      '/assets/products/lotus-prince/angle4.jpg',
    ],
    price: 180.00,
    status: 'RAFFLE ENDED',
    raffleInfo: {
      cart: 'CART BY CARTING',
      form: 'FORM STAYS UP 24 HOURS',
      check: 'CHECK YOUR JUNK TO NEVER MISS A RAFFLE WIN!',
      expected: 'Expected Shipping Date: Jul 28, 2023'
    },
    colors: [
      { name: 'Red', hex: '#FF5252' },
      { name: 'Pink', hex: '#FF80AB' },
      { name: 'Orange', hex: '#FFAB40' },
      { name: 'Yellow', hex: '#FFD740' },
      { name: 'Green', hex: '#69F0AE' },
    ],
    raffleRules: [
      {
        title: 'Raffle Entries open for 24 hours',
        description: 'Link, form, rules, sale and giveaway posts will be shared.'
      },
      {
        title: 'One Entry, One Household',
        description: 'Users found with multiple entries will be disqualified. Please use your real address.'
      },
      {
        title: 'A payment invoice will be sent to your email',
        description: '24 hours after the raffle ends. Please check your spam folder too and reply asap.'
      },
      {
        title: 'If you win, you will receive a payment invoice through a staff member',
        description: 'If you decide to sell your raffle later, your entry will be blacklisted for "Raffle Flips".'
      },
      {
        title: 'Artkey invoices must be paid with Credit Card, PayPal',
        description: 'Within 24 hours, unpaid orders will be cancelled and offered to another winner.'
      },
      {
        title: 'If you win and decide to sell your raffle',
        description: 'Please refrain from profits, this will be your last win at Artkey Raffle ever.'
      },
    ],
    specifications: {
      material: 'Resin',
      profile: 'GMK R1 / Cherry R1',
      stem: 'Cherry MX',
      colorway: 'Lotus Prince',
      concept: 'Folklore & Myths: Nature',
      package: 'An artisan keycap, ID card, sticker, envelope and our beautiful sticker.'
    }
  };
  
  // Mock related products
  const mockRelatedProducts = [
    {
      id: 'akr-keyboard',
      name: 'AKR Keyboard',
      maker: 'Artkey Universe',
      image: '/assets/products/akr-keyboard.jpg',
      price: 340,
      status: 'VENDORS ONLY'
    },
    {
      id: 'giants-uprize',
      name: 'Giants Uprize',
      maker: 'Artkey Universe',
      image: '/assets/products/giants-uprize.jpg',
      price: 195,
      status: 'FULFILLMENT ENDED'
    },
    {
      id: 'dreamwalker-space-ticket',
      name: 'Dreamwalker Space Ticket',
      maker: 'Artkey Universe',
      image: '/assets/products/dreamwalker-space-ticket.jpg',
      price: 180,
      status: 'OUT OF STOCK'
    },
    {
      id: 'fourth-of-july-evolay',
      name: 'Fourth Of July Evolay',
      maker: 'Artkey Universe',
      image: '/assets/products/fourth-of-july-evolay.jpg',
      price: 222,
      status: 'OUT OF STOCK'
    }
  ];
  
  // Mock billiard data
  const billiardData = {
    id: 'predator-ikon-4-1',
    name: 'Predator Ikon 4-1',
    category: 'billiard',
    subcategory: 'cues',
    description: 'Cơ Predator Ikon 4-1 với công nghệ Carbon Fiber, trục Carbon X kết hợp với đầu cơ Z3 cho độ chính xác và điều khiển hoàn hảo.',
    price: 990,
    stock: 5,
    images: [
      '/assets/products/billiard/predator-ikon-4-1/1.jpg',
      '/assets/products/billiard/predator-ikon-4-1/2.jpg',
      '/assets/products/billiard/predator-ikon-4-1/3.jpg',
      '/assets/products/billiard/predator-ikon-4-1/4.jpg',
    ],
    specs: [
      { name: 'Thương hiệu', value: 'Predator' },
      { name: 'Dòng sản phẩm', value: 'Ikon 4-1' },
      { name: 'Chất liệu trục', value: 'Carbon X' },
      { name: 'Đầu cơ', value: 'Z3 Technology' },
      { name: 'Khối lượng', value: '18.5oz' },
      { name: 'Đường kính tip', value: '12.75mm' },
    ],
    features: [
      'Công nghệ Carbon X cho trục cơ siêu nhẹ và cứng cáp',
      'Đầu cơ Z3 giảm hiện tượng deflection đến 31%',
      'Hệ thống nối UniLoc tiên tiến',
      'Grip chống trượt đặc biệt',
      'Cân bằng hoàn hảo cho cảm giác tự nhiên',
    ],
  };
  
  // Dữ liệu mẫu sản phẩm liên quan
  const relatedProductsData = [
    {
      id: '2',
      name: 'Sirius T-shirt',
      price: 27,
      image: '/assets/products/sirius-tshirt.jpg',
      category: 'accessories',
      subcategory: 't-shirt',
    },
    {
      id: '3',
      name: 'Sirius Keychain',
      price: 25,
      image: '/assets/products/sirius-keychain.jpg',
      category: 'accessories',
      subcategory: 'keychain',
    },
    {
      id: '4',
      name: 'Sirius & Goodoo Deskpad',
      price: 30,
      image: '/assets/products/sirius-goodoo-deskpad.jpg',
      category: 'accessories',
      subcategory: 'deskpad',
    },
  ];
  
  // Dữ liệu mẫu sản phẩm billiard liên quan
  const relatedBilliardProductsData = [
    {
      id: 'mezz-ec7-kl',
      name: 'Mezz EC7-KL',
      price: 750,
      image: '/assets/products/billiard/mezz-ec7-kl.jpg',
      category: 'billiard',
      subcategory: 'cues',
    },
    {
      id: 'brunswick-gold-crown',
      name: 'Brunswick Gold Crown VI',
      price: 12500,
      image: '/assets/products/billiard/brunswick-gold-crown.jpg',
      category: 'billiard',
      subcategory: 'tables',
    },
    {
      id: 'kamui-black-chalk',
      name: 'Kamui Black Chalk',
      price: 25,
      image: '/assets/products/billiard/kamui-black-chalk.jpg',
      category: 'billiard',
      subcategory: 'accessories',
    },
  ];
  
  // Sản phẩm gợi ý cho artisan keycap
  
  
  useEffect(() => {
    setLoading(true);
    // Mô phỏng API call
    setTimeout(() => {
      // Kiểm tra nếu là trang billiard
      if (category === 'billiard') {
        setProduct(billiardData);
        setRelatedProducts(relatedBilliardProductsData);
        setSuggestedProducts(suggestedBilliardProductsData);
      } else {
        setProduct(productData);
        setRelatedProducts(mockRelatedProducts);
        setSuggestedProducts(suggestedKeycapProductsData);
      }
      setLoading(false);
    }, 800);
  }, [id, category]);
  
  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const addToCart = () => {
    // Logic thêm vào giỏ hàng ở đây
    alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng`);
  };

  const buyNow = () => {
    // Logic mua ngay ở đây
    alert(`Đang tiến hành thanh toán cho ${quantity} ${product.name}`);
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
        <Link to="/store" className="back-link">
          Back to Store
        </Link>
      </div>
    );
  }
  
  return (
    <div className="store-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">HOME</Link> &gt; <Link to="/store">STORE</Link> &gt; <span>{product.name.toUpperCase()}</span>
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
        <h2 className="section-title">RAFFLE RULE</h2>
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
      
      {/* Sculpt Information Section */}
      <div className="product-specs-section">
        <h2 className="section-title">SCULPT INFORMATION</h2>
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
              to={`/store/${product.category}/${product.id}`}
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
                <p className="related-product-maker">{product.maker || product.category}</p>
                <div className="related-product-price-row">
                  <span className="related-product-price">${product.price}</span>
                  <span className="related-product-status">{product.status || 'IN STOCK'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
     
    
    </div>
  );
};

export default StoreDetail; 