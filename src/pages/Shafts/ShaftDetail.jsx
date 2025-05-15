import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { ProductCard } from '../../components/ProductsPage/ProductCard';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho component ShaftDetail
const shaftDetailTranslations = {
  en: {
    loading: 'Loading...',
    backButton: 'Back',
    color: 'Color:',
    quantity: 'Quantity:',
    addToCart: 'ADD TO CART',
    buyNow: 'BUY NOW',
    description: 'Description',
    features: 'Features',
    specifications: 'Specifications',
    relatedProducts: 'Related Products',
    product: {
      name: 'EX PRO SHAFT',
      shortDescription: 'Professional grade shaft with enhanced performance',
      description: `EX PRO SHAFT is a premium product specially designed for professional players. 
      With special carbon fiber technology, EX PRO SHAFT provides superior stability and accuracy for every shot. 
      The 3-layer structure minimizes vibration, enhances feel, and improves control. 
      This is the top choice of many world-class billiards players.`,
      features: [
        'Advanced carbon fiber technology',
        'Effective 3-layer anti-vibration structure',
        'Optimal balanced weight',
        'Standard 12.5mm diameter',
        'Scratch-resistant surface finish'
      ],
      specs: {
        weight: '3.2oz',
        length: '29 inches',
        tipSize: '12.5mm',
        material: 'Carbon Fiber, North American Maple'
      }
    }
  },
  vi: {
    loading: 'Đang tải...',
    backButton: 'Quay lại',
    color: 'Màu sắc:',
    quantity: 'Số lượng:',
    addToCart: 'THÊM VÀO GIỎ HÀNG',
    buyNow: 'MUA NGAY',
    description: 'Mô tả',
    features: 'Đặc điểm',
    specifications: 'Thông số kỹ thuật',
    relatedProducts: 'Sản phẩm liên quan',
    product: {
      name: 'THÂN CƠ EX PRO',
      shortDescription: 'Thân cơ chuyên nghiệp với hiệu suất vượt trội',
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
      }
    }
  }
};

const ShaftDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { language, registerTranslations } = useLanguage();
  
  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('shaftDetail', shaftDetailTranslations);
  }, [registerTranslations]);
  
  // Mock data - trong thực tế sẽ fetch từ API
  const shaftData = {
    id: id,
    name: t('shaftDetail.product.name'),
    category: category,
    images: [
      '/images/shafts/ex-pro-shaft-detail.jpg',
      '/images/shafts/ex-pro-shaft-detail-2.jpg',
      '/images/shafts/ex-pro-shaft-detail-3.jpg'
    ],
    colors: ['#223344', '#664422'],
    price: 450.00,
    discount: 0,
    shortDescription: t('shaftDetail.product.shortDescription'),
    description: t('shaftDetail.product.description'),
    features: shaftDetailTranslations[language].product.features,
    specs: shaftDetailTranslations[language].product.specs,
    status: t('common.status.inStock', 'In Stock')
  };
  
  const mockRelatedProducts = [
    {
      id: 's3-1',
      name: 'S3 PREMIUM',
      category: 's3',
      image: '/images/shafts/s3-premium.jpg',
      price: 380.00,
      path: '/products/shafts/s3/premium',
      status: t('common.status.inStock', 'In Stock'),
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
      status: t('common.status.preOrder', 'Pre-order'),
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
    return <div className="loading">{t('shaftDetail.loading')}</div>;
  }
  
  // Tính giá sau giảm giá nếu có
  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  return (
    <div className="product-detail-page">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> {t('shaftDetail.backButton')}
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
            <h3>{t('shaftDetail.color')}</h3>
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
            <h3>{t('shaftDetail.quantity')}</h3>
            <div className="quantity-control">
              <button className="qty-btn dec">-</button>
              <input type="number" min="1" value="1" readOnly />
              <button className="qty-btn inc">+</button>
            </div>
          </div>
          
          <div className="product-actions">
            <button className="add-to-cart-button">{t('shaftDetail.addToCart')}</button>
            <button className="buy-now-button">{t('shaftDetail.buyNow')}</button>
          </div>
        </div>
      </div>
      
      <div className="product-details-tabs">
        <div className="tabs-header">
          <div className="tab active">{t('shaftDetail.description')}</div>
          <div className="tab">{t('shaftDetail.features')}</div>
          <div className="tab">{t('shaftDetail.specifications')}</div>
        </div>
        
        <div className="tab-content">
          <div className="description-tab">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      
      <div className="related-products-section">
        <h2>{t('shaftDetail.relatedProducts')}</h2>
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