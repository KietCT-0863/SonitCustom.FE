import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { ProductCard } from '../../components/ProductsPage/ProductCard';

const ShaftDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  
  // Mock data - trong thực tế sẽ fetch từ API
  const shaftData = {
    id: id,
    name: 'EX PRO SHAFT',
    category: category,
    images: [
      '/images/shafts/ex-pro-shaft-detail.jpg',
      '/images/shafts/ex-pro-shaft-detail-2.jpg',
      '/images/shafts/ex-pro-shaft-detail-3.jpg'
    ],
    colors: ['#223344', '#664422'],
    price: 450.00,
    discount: 0,
    shortDescription: 'Professional grade shaft with enhanced performance',
    description: `EX PRO SHAFT là sản phẩm cao cấp được thiết kế đặc biệt cho các cơ thủ chuyên nghiệp. 
    Với công nghệ carbon fiber đặc biệt, EX PRO SHAFT mang lại độ ổn định và độ chính xác vượt trội cho mọi cú đánh. 
    Cấu trúc 3 lớp giúp giảm thiểu độ rung, tăng cường cảm giác và kiểm soát tốt hơn. 
    Đây là lựa chọn hàng đầu của nhiều vận động viên billiards đẳng cấp thế giới.`,
    features: [
      'Công nghệ carbon fiber tiên tiến',
      'Cấu trúc 3 lớp chống rung hiệu quả',
      'Trọng lượng cân bằng tối ưu',
      'Đường kính 12.5mm tiêu chuẩn',
      'Hoàn thiện bề mặt chống trầy xước'
    ],
    specs: {
      weight: '3.2oz',
      length: '29 inches',
      tipSize: '12.5mm',
      material: 'Carbon Fiber, North American Maple'
    },
    status: 'In Stock'
  };
  
  const mockRelatedProducts = [
    {
      id: 's3-1',
      name: 'S3 PREMIUM',
      category: 's3',
      image: '/images/shafts/s3-premium.jpg',
      price: 380.00,
      path: '/products/shafts/s3/premium',
      status: 'In Stock',
      colors: ['#223344', '#664422', '#884422'],
      discount: 10,
      isNew: false
    },
    {
      id: 'g-core-1',
      name: 'G-CORE CARBON',
      category: 'g-core',
      image: '/images/shafts/g-core-carbon.jpg',
      price: 520.00,
      path: '/products/shafts/g-core/carbon',
      status: 'Pre-order',
      colors: ['#223344', '#664422'],
      discount: 0,
      isNew: true
    }
  ];
  
  useEffect(() => {
    // Mô phỏng API call để lấy chi tiết sản phẩm
    setProduct(shaftData);
    setSelectedImage(shaftData.images[0]);
    setSelectedColor(shaftData.colors[0]);
    setRelatedProducts(mockRelatedProducts);
  }, [category, id]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  
  const handleRelatedProductClick = (path) => {
    navigate(path);
  };
  
  if (!product) {
    return <div className="loading">Đang tải...</div>;
  }
  
  // Tính giá sau giảm giá nếu có
  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  return (
    <div className="product-detail-page">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> Quay lại
        </button>
      </div>
      
      <div className="product-detail-container">
        <div className="product-detail-left">
          <div className="product-main-image">
            <img src={selectedImage} alt={product.name} />
          </div>
          <div className="product-thumbnails">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                onClick={() => handleImageClick(image)}
              >
                <img src={image} alt={`${product.name} ${index+1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="product-detail-right">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-price-container">
            {product.discount > 0 && (
              <span className="original-price">${product.price.toFixed(2)}</span>
            )}
            <span className="final-price">${finalPrice.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="discount-tag">-{product.discount}%</span>
            )}
          </div>
          
          <div className="product-status">{product.status}</div>
          
          <p className="product-short-description">{product.shortDescription}</p>
          
          <div className="color-selection">
            <h3>Màu sắc:</h3>
            <div className="color-options">
              {product.colors.map((color, index) => (
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
            <h3>Số lượng:</h3>
            <div className="quantity-control">
              <button className="qty-btn dec">-</button>
              <input type="number" min="1" value="1" readOnly />
              <button className="qty-btn inc">+</button>
            </div>
          </div>
          
          <div className="product-actions">
            <button className="add-to-cart-button">THÊM VÀO GIỎ HÀNG</button>
            <button className="buy-now-button">MUA NGAY</button>
          </div>
        </div>
      </div>
      
      <div className="product-details-tabs">
        <div className="tabs-header">
          <div className="tab active">Mô tả</div>
          <div className="tab">Đặc điểm</div>
          <div className="tab">Thông số kỹ thuật</div>
        </div>
        
        <div className="tab-content">
          <div className="description-tab">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      
      <div className="related-products-section">
        <h2>Sản phẩm liên quan</h2>
        <div className="related-products-grid">
          {relatedProducts.map(relatedProduct => (
            <ProductCard 
              key={relatedProduct.id}
              product={relatedProduct}
              onClick={() => handleRelatedProductClick(relatedProduct.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShaftDetail; 