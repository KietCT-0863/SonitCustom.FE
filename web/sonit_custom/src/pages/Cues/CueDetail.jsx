import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { ProductCard } from '../../components/ProductsPage/ProductCard';

const CueDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  
  // Mock data - trong thực tế sẽ fetch từ API
  const cueData = {
    id: id,
    name: 'EXCEED PROFESSIONAL CUE',
    category: category,
    images: [
      '/images/cues/exceed-pro-1.jpg',
      '/images/cues/exceed-pro-2.jpg',
      '/images/cues/exceed-pro-3.jpg'
    ],
    colors: ['#223344', '#664422', '#FFFFFF'],
    price: 1299.99,
    discount: 10,
    shortDescription: 'Professional grade billiard cue with advanced technology',
    description: `Exceed Professional Cue là sản phẩm cao cấp được thiết kế cho các tay chơi chuyên nghiệp. 
    Cây cơ sử dụng công nghệ tiên tiến nhất với shaft carbon fiber độc quyền của EXCEED, 
    mang lại độ ổn định và độ chính xác vượt trội trong mọi cú đánh. 
    Thiết kế với vân gỗ tự nhiên cao cấp kết hợp cùng các chi tiết kim loại tinh xảo.`,
    features: [
      'Carbon fiber shaft giảm độ rung',
      'Butt end được làm từ gỗ maple cao cấp',
      'Grip được thiết kế với công nghệ chống trượt',
      'Joint bằng thép không gỉ chuẩn xác'
    ],
    specs: {
      weight: '19-21oz',
      length: '58 inches',
      tipSize: '12-13mm',
      material: 'Maple, Carbon Fiber, Stainless Steel'
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
    // Mô phỏng API call để lấy chi tiết sản phẩm
    setProduct(cueData);
    setSelectedImage(cueData.images[0]);
    setSelectedColor(cueData.colors[0]);
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

export default CueDetail; 