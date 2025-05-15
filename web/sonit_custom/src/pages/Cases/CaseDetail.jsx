import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { ProductCard } from '../../components/ProductsPage/ProductCard';

const CaseDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  
  // Mock data - trong thực tế sẽ fetch từ API
  const caseData = {
    id: id,
    name: 'EXCEED HARD CASE',
    category: category,
    images: [
      '/images/cases/hard-case-1-detail.jpg',
      '/images/cases/hard-case-1-detail-2.jpg',
      '/images/cases/hard-case-1-detail-3.jpg'
    ],
    colors: ['#000000', '#8B4513'],
    price: 159.99,
    discount: 0,
    shortDescription: 'Premium hard case for maximum protection',
    description: `EXCEED Hard Case là sản phẩm bảo vệ cao cấp được thiết kế để bảo vệ cây cơ của bạn một cách tối đa. 
    Được làm từ vật liệu hợp kim nhôm cao cấp với lớp đệm EVA bên trong, sản phẩm này đảm bảo cây cơ của bạn luôn 
    được bảo vệ khỏi các tác động bên ngoài. Với thiết kế sang trọng và chắc chắn, EXCEED Hard Case không chỉ là một 
    sản phẩm bảo vệ mà còn là món phụ kiện đẳng cấp cho người chơi billiards.`,
    features: [
      'Vỏ hợp kim nhôm chống va đập cao',
      'Lớp đệm EVA cao cấp bảo vệ tối đa',
      'Khóa an toàn chống trộm',
      'Tay cầm ergonomic tiện lợi',
      'Thiết kế nội thất tùy chỉnh cho cơ và phụ kiện'
    ],
    specs: {
      weight: '3.5kg',
      length: '140cm',
      width: '15cm',
      height: '12cm',
      capacity: 'Fits 1 cue with 2 shafts'
    },
    status: 'In Stock'
  };
  
  const mockRelatedProducts = [
    {
      id: 'hard-2',
      name: 'EXCEED PREMIUM HARD CASE',
      category: 'hard-cases',
      image: '/images/cases/hard-case-2.jpg',
      price: 199.99,
      path: '/products/cases/hard-cases/hard-2',
      status: 'In Stock',
      colors: ['#8B4513', '#000000'],
      discount: 0,
      isNew: false
    },
    {
      id: 'soft-1',
      name: 'EXCEED SOFT CASE',
      category: 'soft-cases',
      image: '/images/cases/soft-case-1.jpg',
      price: 89.99,
      path: '/products/cases/soft-cases/soft-1',
      status: 'In Stock',
      colors: ['#000000', '#0000FF'],
      discount: 10,
      isNew: false
    }
  ];
  
  useEffect(() => {
    // Mô phỏng API call để lấy chi tiết sản phẩm
    setProduct(caseData);
    setSelectedImage(caseData.images[0]);
    setSelectedColor(caseData.colors[0]);
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

export default CaseDetail; 