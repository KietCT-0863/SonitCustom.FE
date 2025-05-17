import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop';
import './styles.css';

const CatalogueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const isRing = pathname.includes('/ring/');
  const isBilliard = pathname.includes('/billiard/');

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
      // Xác định loại sản phẩm dựa trên đường dẫn và ID
      if (isBilliard || (id && id.startsWith('b'))) {
        setProduct(billiardProductData);
        setRelatedProducts(mockRelatedBilliardProducts);
      } else {
        setProduct(productData);
        setRelatedProducts(mockRelatedProducts);
      }
      setLoading(false);
    }, 800);
  }, [id, isBilliard]);
  
  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };
  
  // Thêm các hàm xử lý tab và cuộn trang
  useEffect(() => {
    // Xử lý tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const contentHeader = document.getElementById('content-header');

    const handleTabClick = (e) => {
      const tabId = e.target.getAttribute('data-tab');
      
      // Cập nhật trạng thái active cho tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      e.target.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    };

    tabButtons.forEach(button => {
      button.addEventListener('click', handleTabClick);
    });

    // Xử lý header cố định khi cuộn trang
    const handleScroll = () => {
      if (contentHeader) {
        if (window.pageYOffset > 400) {
          contentHeader.classList.add('fixed');
        } else {
          contentHeader.classList.remove('fixed');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listeners
    return () => {
      tabButtons.forEach(button => {
        button.removeEventListener('click', handleTabClick);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]); // Chỉ chạy sau khi trang đã load xong
  
  if (loading) {
    return (
      <div className="catalogue-detail-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="catalogue-detail-error">
        <h2>Không tìm thấy sản phẩm</h2>
        <button className="back-button" onClick={() => navigate('/catalogue')}>
          Quay lại Catalogue
        </button>
      </div>
    );
  }
  
  return (
    <div className="catalogue-detail-page">
      {/* Breadcrumb */}
      <div className="catalogue-detail-breadcrumb">
        <Link to="/">Trang chủ</Link> / 
        <Link to="/catalogue">Catalogue</Link> / 
        <span className="active">{product.name}</span>
      </div>
      
      {/* Product Preview */}
      <div className="catalogue-detail-preview">
        <div className="preview-gallery">
          <div className="main-image-container">
            <div className="main-image">
              <img src={product.images[selectedImage] || product.imageUrl || '/assets/placeholder.jpg'} alt={product.name} />
            </div>
          </div>
          <div className="thumbnails-container">
            {product.images && product.images.map((image, index) => (
              <div 
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`} 
                key={index}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={image} alt={`${product.name} - view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="preview-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-category">{product.category} | {product.brand}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          
          <div className="product-specs">
            <h3>Thông số kỹ thuật</h3>
            <div className="specs-table">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div className="spec-row" key={key}>
                  <div className="spec-name">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                  <div className="spec-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="product-actions">
            <button className="action-button primary">
              Thêm vào giỏ hàng
            </button>
            <button className="action-button secondary">
              Thêm vào yêu thích
            </button>
          </div>
        </div>
      </div>
      
      {/* Product Content */}
      <div className="catalogue-detail-content">
        <div className="content-header" id="content-header">
          <div className="tabs-container">
            <button className="tab-button active" data-tab="description">Câu chuyện sản phẩm</button>
            <button className="tab-button" data-tab="process">Quy trình sản xuất</button>
            <button className="tab-button" data-tab="features">Tính năng</button>
            <button className="tab-button" data-tab="notes">Ghi chú thiết kế</button>
          </div>
        </div>
        
        <div className="tab-content-container">
          <div className="tab-content active" id="description">
            <h3>Câu chuyện sản phẩm</h3>
            <p>Dòng sản phẩm {product.name} được chế tác với tinh thần đột phá và sáng tạo từ Sonit Custom. Lấy cảm hứng từ những hình khối tối giản của thiên nhiên và kỹ thuật chế tác tiên tiến, mỗi sản phẩm {product.name} đều là tác phẩm nghệ thuật được hoàn thiện thủ công.</p>
            <p>Nguyên liệu được lựa chọn kỹ lưỡng và đảm bảo chất lượng cao nhất, chúng tôi sử dụng {product.specifications.material} cao cấp giúp sản phẩm bền bỉ với thời gian nhưng vẫn giữ được vẻ đẹp nguyên bản.</p>
            <p>Chúng tôi tự hào giới thiệu dòng sản phẩm {product.name} như một biểu tượng của phong cách mạnh mẽ và độc đáo, phù hợp cho những ai đang tìm kiếm sự khác biệt và đẳng cấp trong từng chi tiết.</p>
          </div>
          
          <div className="tab-content" id="process">
            <h3>Quy trình sản xuất</h3>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">01</div>
                <h4>Lấy ý tưởng & Thiết kế</h4>
                <p className="step-description">Mỗi sản phẩm bắt đầu từ ý tưởng của đội ngũ thiết kế, được phác họa và mô phỏng 3D trước khi chuyển sang giai đoạn tiếp theo.</p>
              </div>
              <div className="process-step">
                <div className="step-number">02</div>
                <h4>Lựa chọn nguyên liệu</h4>
                <p className="step-description">Chúng tôi chỉ sử dụng những nguyên liệu tốt nhất, được nhập khẩu và kiểm định nghiêm ngặt.</p>
              </div>
              <div className="process-step">
                <div className="step-number">03</div>
                <h4>Chế tác & Gia công</h4>
                <p className="step-description">Các nghệ nhân lành nghề sử dụng công nghệ hiện đại kết hợp với kỹ thuật thủ công truyền thống để tạo ra sản phẩm.</p>
              </div>
              <div className="process-step">
                <div className="step-number">04</div>
                <h4>Hoàn thiện & Kiểm tra</h4>
                <p className="step-description">Mỗi sản phẩm được mài dũa, đánh bóng và kiểm tra kỹ lưỡng trước khi đến tay khách hàng.</p>
              </div>
            </div>
          </div>
          
          <div className="tab-content" id="features">
            <h3>Tính năng nổi bật</h3>
            <div className="features-list">
              <div className="feature-item">
                <h3>Thiết kế đột phá</h3>
                <p>Được thiết kế với những đường nét tinh tế và táo bạo, {product.name} mang đến vẻ đẹp vượt thời gian.</p>
              </div>
              <div className="feature-item">
                <h3>Chất liệu cao cấp</h3>
                <p>Sử dụng {product.specifications.material} cao cấp, đảm bảo độ bền và tính thẩm mỹ vượt trội.</p>
              </div>
              <div className="feature-item">
                <h3>Hoàn thiện tinh xảo</h3>
                <p>Mỗi chi tiết đều được chăm chút tỉ mỉ, tạo nên sự hoàn hảo trong từng đường nét.</p>
              </div>
              <div className="feature-item">
                <h3>Tính độc đáo</h3>
                <p>Mỗi sản phẩm đều mang đặc trưng riêng, tạo nên dấu ấn cá nhân cho người sở hữu.</p>
              </div>
            </div>
          </div>
          
          <div className="tab-content" id="notes">
            <h3>Ghi chú thiết kế</h3>
            <p>Phiên bản {product.version} của {product.name} là kết quả của nhiều tháng nghiên cứu và phát triển. Mỗi chi tiết đều được cân nhắc kỹ lưỡng để đảm bảo sự cân bằng giữa tính thẩm mỹ và công năng.</p>
            <p>Đặc biệt, chúng tôi đã cải tiến quy trình {product.category === 'RING' ? 'đúc và mài' : 'chế tác và gia công'} để tạo ra bề mặt hoàn thiện mịn màng hơn trong khi vẫn giữ được đặc tính cứng cáp của vật liệu.</p>
            <p>Mỗi sản phẩm {product.name} đều được đánh số seri riêng, đảm bảo tính độc quyền và dễ dàng theo dõi nguồn gốc sản phẩm.</p>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="catalogue-detail-related">
        <h2>Sản phẩm liên quan</h2>
        <div className="related-products-grid">
          {relatedProducts.map(product => (
            <div 
              className="related-product-card" 
              key={product.id}
              onClick={() => navigate(`/catalogue/${product.category.toLowerCase()}/${product.id}`)}
            >
              <div className="related-product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="related-product-info">
                <h3>{product.name}</h3>
                <p className="related-product-category">{product.maker}</p>
                <p className="related-product-price">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <ScrollToTop />
    </div>
  );
};

export default CatalogueDetail; 