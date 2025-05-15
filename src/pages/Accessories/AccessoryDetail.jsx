import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { ProductCard } from '../../components/ProductsPage/ProductCard';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho component AccessoryDetail
const accessoryDetailTranslations = {
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
      name: 'PREMIUM CHALK',
      shortDescription: 'High-performance chalk for optimal tip grip',
      description: `EXCEED Premium Chalk is a high-end product specifically designed for professional players. 
      With its proprietary formula, EXCEED chalk increases friction between the cue tip and ball, 
      minimizing miscues and improving shot accuracy. The chalk is tightly compressed, produces less dust, 
      and adheres well to the cue tip.`,
      features: [
        'Proprietary formula for optimal grip',
        'Low dust, keeps tables cleaner',
        'Long-lasting performance reduces chalking frequency',
        'Convenient box design for easy carrying'
      ],
      specs: {
        weight: '0.5oz',
        size: '1.5 inches',
        quantity: '1 cube per box',
        material: 'Premium silica compound'
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
      name: 'PHẤN CAO CẤP',
      shortDescription: 'Phấn hiệu suất cao cho độ bám tip tối ưu',
      description: `Premium Chalk của EXCEED là sản phẩm phấn cao cấp được thiết kế đặc biệt cho các tay chơi chuyên nghiệp. 
      Với công thức độc quyền, phấn EXCEED giúp tăng ma sát giữa tip cơ và bi, giảm thiểu khả năng bị miscue và tăng độ chính xác cho các cú đánh. 
      Phấn được nén chặt, ít bụi, đồng thời bám dính tốt trên tip cơ.`,
      features: [
        'Công thức pha trộn độc quyền tạo độ bám tốt nhất',
        'Ít bụi, giữ bàn chơi sạch sẽ hơn',
        'Duy trì hiệu suất lâu dài không cần thoa phấn thường xuyên',
        'Thiết kế hộp tiện lợi, dễ mang theo'
      ],
      specs: {
        weight: '0.5oz',
        size: '1.5 inches',
        quantity: '1 viên/hộp',
        material: 'Hợp chất silica cao cấp'
      }
    }
  }
};

const AccessoryDetail = () => {
  // 1. Khai báo tất cả state hooks trước
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, registerTranslations } = useLanguage();
  const [accessory, setAccessory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTab, setSelectedTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // 2. Sau đó đến các effect hooks
  useEffect(() => {
    registerTranslations('accessoryDetail', accessoryDetailTranslations);
  }, [registerTranslations]);

  useEffect(() => {
    // Load data
    // ...
  }, [id]);
  
  // 3. Các hàm xử lý sự kiện
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
  if (!accessory) {
    return <div className="loading">{t('accessoryDetail.loading')}</div>;
  }
  
  // Tính giá sau giảm giá nếu có
  const finalPrice = accessory.discount 
    ? accessory.price * (1 - accessory.discount / 100) 
    : accessory.price;
  
  return (
    <div className="product-detail-page">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> {t('accessoryDetail.backButton')}
        </button>
      </div>
      
      <div className="product-detail-container">
        <div className="product-detail-left">
          <div className="product-main-image">
            <img src={selectedImage} alt={accessory.name} />
          </div>
          <div className="product-thumbnails">
            {accessory.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                onClick={() => handleImageClick(image)}
              >
                <img src={image} alt={`${accessory.name} ${index+1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="product-detail-right">
          <h1 className="product-title">{accessory.name}</h1>
          
          <div className="product-price-container">
            {accessory.discount > 0 && (
              <span className="original-price">${accessory.price.toFixed(2)}</span>
            )}
            <span className="final-price">${finalPrice.toFixed(2)}</span>
            {accessory.discount > 0 && (
              <span className="discount-tag">-{accessory.discount}%</span>
            )}
          </div>
          
          <div className="product-status">{accessory.status}</div>
          
          <p className="product-short-description">{accessory.shortDescription}</p>
          
          {accessory.colors && accessory.colors.length > 0 && (
            <div className="color-selection">
              <h3>{t('accessoryDetail.color')}</h3>
              <div className="color-options">
                {accessory.colors.map((color, index) => (
                  <div 
                    key={index} 
                    className={`color-option ${selectedColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  ></div>
                ))}
              </div>
            </div>
          )}
          
          <div className="quantity-selector">
            <h3>{t('accessoryDetail.quantity')}</h3>
            <div className="quantity-control">
              <button className="qty-btn dec">-</button>
              <input type="number" min="1" value="1" readOnly />
              <button className="qty-btn inc">+</button>
            </div>
          </div>
          
          <div className="product-actions">
            <button className="add-to-cart-button">{t('accessoryDetail.addToCart')}</button>
            <button className="buy-now-button">{t('accessoryDetail.buyNow')}</button>
          </div>
        </div>
      </div>
      
      <div className="product-details-tabs">
        <div className="tabs-header">
          <div className="tab active">{t('accessoryDetail.description')}</div>
          <div className="tab">{t('accessoryDetail.features')}</div>
          <div className="tab">{t('accessoryDetail.specifications')}</div>
        </div>
        
        <div className="tab-content">
          <div className="description-tab">
            <p>{accessory.description}</p>
          </div>
        </div>
      </div>
      
      <div className="related-products-section">
        <h2>{t('accessoryDetail.relatedProducts')}</h2>
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

export default AccessoryDetail; 