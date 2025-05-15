import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { ProductCard } from '../../components/ProductsPage/ProductCard';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho component CueDetail
const cueDetailTranslations = {
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
      name: 'EXCEED PROFESSIONAL CUE',
      shortDescription: 'Professional grade billiard cue with advanced technology',
      description: `Exceed Professional Cue is a premium product designed for professional players. 
      The cue uses the most advanced technology with EXCEED's exclusive carbon fiber shaft, 
      providing superior stability and accuracy in every shot. 
      Designed with premium natural wood grain combined with exquisite metal details.`,
      features: [
        'Carbon fiber shaft reduces vibration',
        'Butt end made from premium maple wood',
        'Grip designed with anti-slip technology',
        'Stainless steel joint for precision'
      ],
      specs: {
        weight: '19-21oz',
        length: '58 inches',
        tipSize: '12-13mm',
        material: 'Maple, Carbon Fiber, Stainless Steel'
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
      name: 'CƠ EXCEED CHUYÊN NGHIỆP',
      shortDescription: 'Cơ billiards chuyên nghiệp với công nghệ tiên tiến',
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
      }
    }
  }
};

const CueDetail = () => {
  // 1. State hooks first
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, registerTranslations } = useLanguage();
  const [cue, setCue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTab, setSelectedTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // 2. Effect hooks
  useEffect(() => {
    registerTranslations('cueDetail', cueDetailTranslations);
  }, [registerTranslations]);

  useEffect(() => {
    // Load cue data
    setLoading(true);
    // Fetch logic...
  }, [id]);
  
  // Mock data - trong thực tế sẽ fetch từ API
  const cueData = {
    id: id,
    name: t('cueDetail.product.name'),
    category: 'professional',
    images: [
      '/images/cues/exceed-pro-1.jpg',
      '/images/cues/exceed-pro-2.jpg',
      '/images/cues/exceed-pro-3.jpg'
    ],
    colors: ['#223344', '#664422', '#FFFFFF'],
    price: 1299.99,
    discount: 10,
    shortDescription: t('cueDetail.product.shortDescription'),
    description: t('cueDetail.product.description'),
    features: cueDetailTranslations[language].product.features,
    specs: cueDetailTranslations[language].product.specs,
    status: t('common.status.inStock', 'In Stock')
  };
  
  const mockRelatedProducts = [
    {
      id: 'pro-1',
      name: 'EXCEED ELITE CUE',
      category: 'professional',
      image: '/images/cues/exceed-elite.jpg',
      price: 899.99,
      path: '/products/cues/professional/pro-1',
      status: t('common.status.inStock', 'In Stock'),
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
      status: t('common.status.inStock', 'In Stock'),
      colors: ['#000000', '#3366CC'],
      discount: 5,
      isNew: false
    }
  ];
  
  useEffect(() => {
    // Mô phỏng API call để lấy chi tiết sản phẩm
    setCue(cueData);
    setSelectedImage(cueData.images[0]);
    setSelectedColor(cueData.colors[0]);
    setRelatedProducts(mockRelatedProducts);
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
  
  const handleRelatedProductClick = (path) => {
    navigate(path);
  };
  
  // 4. Return JSX
  if (!cue) {
    return <div className="loading">{t('cueDetail.loading')}</div>;
  }
  
  // Tính giá sau giảm giá nếu có
  const finalPrice = cue.discount 
    ? cue.price * (1 - cue.discount / 100) 
    : cue.price;
  
  return (
    <div className="product-detail-page">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> {t('cueDetail.backButton')}
        </button>
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
            <h3>{t('cueDetail.color')}</h3>
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
          
          <div className="product-actions">
            <button className="add-to-cart-button">{t('cueDetail.addToCart')}</button>
            <button className="buy-now-button">{t('cueDetail.buyNow')}</button>
          </div>
        </div>
      </div>
      
      <div className="product-details-tabs">
        <div className="tabs-header">
          <div className="tab active">{t('cueDetail.description')}</div>
          <div className="tab">{t('cueDetail.features')}</div>
          <div className="tab">{t('cueDetail.specifications')}</div>
        </div>
        
        <div className="tab-content">
          <div className="description-tab">
            <p>{cue.description}</p>
          </div>
        </div>
      </div>
      
      <div className="related-products-section">
        <h2>{t('cueDetail.relatedProducts')}</h2>
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