import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop';
import './styles.css';

// Dữ liệu mẫu sản phẩm theo năm
const productsByYear = {
  2023: [
    { id: 'p101', name: 'APEX', imageUrl: '/assets/products/apex.jpg', category: 'RING', description: 'Chiếc nhẫn với thiết kế tối giản nhưng đầy mạnh mẽ, được chế tác từ titanium cao cấp với đường nét sắc sảo và bề mặt được xử lý đặc biệt.' },
    { id: 'p102', name: 'ARTEMIS', imageUrl: '/assets/products/artemis.jpg', category: 'RING', description: 'Lấy cảm hứng từ nữ thần săn bắn, thiết kế mang đường nét mạnh mẽ nhưng vẫn giữ được sự tinh tế với các chi tiết chạm khắc tinh xảo.' },
    { id: 'p103', name: 'JAWS', imageUrl: '/assets/products/jaws.jpg', category: 'RING', description: 'Đậm chất hoang dã với hình ảnh răng nanh sắc nhọn, được chế tác từ bạc cao cấp với độ hoàn thiện xuất sắc.' },
    { id: 'p104', name: 'PHANTOM', imageUrl: '/assets/products/phantom.jpg', category: 'RING', description: 'Thiết kế bí ẩn, huyền bí với gam màu đen chủ đạo, kết hợp điểm nhấn kim loại sáng tạo cảm giác tương phản mạnh mẽ.' },
    { id: 'b101', name: 'PREDATOR IKON 4-1', imageUrl: '/assets/products/billiard/predator-ikon-4-1.jpg', category: 'BILLIARD', description: 'Cơ Predator Ikon 4-1 với công nghệ Carbon Fiber, trục Carbon X kết hợp với đầu cơ Z3 cho độ chính xác và điều khiển hoàn hảo.' },
    { id: 'b102', name: 'MEZZ EC7-KL', imageUrl: '/assets/products/billiard/mezz-ec7-kl.jpg', category: 'BILLIARD', description: 'Sở hữu trục Hybrid Pro II, kết hợp với đầu cơ United giúp tạo ra cú đánh ổn định và cảm giác chuyển cơ mượt mà tuyệt đối.' }
  ],
  2022: [
    { id: 'p201', name: 'PROWLER', imageUrl: '/assets/products/prowler.jpg', category: 'RING', description: 'Thiết kế mô phỏng dáng vẻ của loài báo săn mồi, mang đến vẻ đẹp nguy hiểm và quyến rũ.' },
    { id: 'p202', name: 'CHALLENGER', imageUrl: '/assets/products/challenger.jpg', category: 'RING', description: 'Biểu tượng của sự thách thức và vượt qua giới hạn, với thiết kế hiện đại và đường nét táo bạo.' },
    { id: 'p203', name: 'VIPER', imageUrl: '/assets/products/viper.jpg', category: 'RING', description: 'Lấy cảm hứng từ loài rắn độc, mang đến vẻ đẹp nguy hiểm với đường nét uốn lượn tinh tế.' },
    { id: 'p204', name: 'SHADOW', imageUrl: '/assets/products/shadow.jpg', category: 'RING', description: 'Thiết kế tối giản nhưng đầy bí ẩn, với chất liệu carbon đen tuyền và bề mặt xử lý đặc biệt tạo hiệu ứng bóng mờ.' },
    { id: 'b201', name: 'BRUNSWICK GOLD CROWN VI', imageUrl: '/assets/products/billiard/brunswick-gold-crown.jpg', category: 'BILLIARD', description: 'Bàn billiard chuyên nghiệp được thiết kế với công nghệ Super Speed Rail cho độ nảy bóng hoàn hảo và độ bền vượt trội.' },
    { id: 'b202', name: 'KAMUI BLACK CHALK', imageUrl: '/assets/products/billiard/kamui-black-chalk.jpg', category: 'BILLIARD', description: 'Phấn đánh cơ cao cấp với công thức đặc biệt giúp tăng độ bám, giảm thiểu miscue và tạo spin hiệu quả.' }
  ],
  2021: [
    { id: 'p301', name: 'FURY', imageUrl: '/assets/products/fury.jpg', category: 'RING', description: 'Biểu tượng của sức mạnh và sự phẫn nộ, với thiết kế góc cạnh và mạnh mẽ, được chế tác từ hợp kim titanium cao cấp.' },
    { id: 'p302', name: 'APEX-II', imageUrl: '/assets/products/apex-ii.jpg', category: 'RING', description: 'Phiên bản cải tiến của dòng APEX, mang đến thiết kế tinh tế hơn với những đường nét sắc sảo và chất liệu cao cấp.' },
    { id: 'p303', name: 'MONOLITH', imageUrl: '/assets/products/monolith.jpg', category: 'RING', description: 'Thiết kế lấy cảm hứng từ những khối đá cổ đại, mang đến cảm giác vững chãi và bí ẩn với chất liệu tungsten đen bóng.' },
    { id: 'p304', name: 'RAVAGER', imageUrl: '/assets/products/ravager.jpg', category: 'RING', description: 'Đậm chất hoang dã với thiết kế giống như những vết cào xước của dã thú, tạo nên vẻ ngoài độc đáo và ấn tượng.' }
  ],
  2020: [
    { id: 'p401', name: 'DOMINANCE', imageUrl: '/assets/products/dominance.jpg', category: 'RING', description: 'Biểu tượng của quyền lực và sự thống trị, với thiết kế mạnh mẽ và đồ sộ, thể hiện đẳng cấp của người đeo.' },
    { id: 'p402', name: 'SAVAGE', imageUrl: '/assets/products/savage.jpg', category: 'RING', description: 'Vẻ đẹp hoang dã và không tuân theo quy tắc, với những đường nét thô ráp nhưng được chế tác tinh xảo.' },
    { id: 'p403', name: 'TERROR', imageUrl: '/assets/products/terror.jpg', category: 'RING', description: 'Thiết kế gây ám ảnh với những chi tiết gai góc, tạo cảm giác sợ hãi nhưng đầy quyến rũ.' },
    { id: 'p404', name: 'CLAW', imageUrl: '/assets/products/claw.jpg', category: 'RING', description: 'Mô phỏng móng vuốt của loài thú săn mồi, mang đến vẻ đẹp nguy hiểm và sức mạnh hoang dã.' }
  ],
  2019: [
    { id: 'p501', name: 'VORTEX', imageUrl: '/assets/products/vortex.jpg', category: 'RING', description: 'Thiết kế xoáy ốc độc đáo tạo hiệu ứng thị giác mạnh mẽ, như đang hút người xem vào một chiều không gian khác.' },
    { id: 'p502', name: 'RAGE', imageUrl: '/assets/products/rage.jpg', category: 'RING', description: 'Biểu tượng của cơn thịnh nộ không kiềm chế, với thiết kế mạnh mẽ và đường nét sắc bén.' },
    { id: 'p503', name: 'DEMON', imageUrl: '/assets/products/demon.jpg', category: 'RING', description: 'Lấy cảm hứng từ hình ảnh ác quỷ trong thần thoại, mang đến vẻ đẹp tà mị đầy quyến rũ.' },
    { id: 'p504', name: 'REAPER', imageUrl: '/assets/products/reaper.jpg', category: 'RING', description: 'Thiết kế lấy cảm hứng từ thần chết, với gam màu đen chủ đạo và những đường nét sắc lẹm như lưỡi hái.' }
  ]
};

const CataloguePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const yearRefs = useRef({});
  
  const years = Object.keys(productsByYear).sort((a, b) => b - a); // Sắp xếp năm từ mới đến cũ
  
  // Set năm đầu tiên là active năm khi load trang
  useEffect(() => {
    if (years.length > 0 && !activeYear) {
      setActiveYear(years[0]);
    }
  }, [years]);
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };
  
  const scrollToYear = (year) => {
    setActiveYear(year);
    if (yearRefs.current[year]) {
      yearRefs.current[year].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const renderTimeline = () => {
    return (
      <div className="timeline">
        {years.map((year) => (
          <div 
            className={`timeline-item ${activeYear === year ? 'active' : ''}`} 
            key={year}
            onClick={() => scrollToYear(year)}
          >
            <div className="timeline-year-wrapper">
              <div className="timeline-dot"></div>
              <div className="timeline-year">{year}</div>
            </div>
            <div className="timeline-line"></div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="catalogue-container">
      <div className="catalogue-header">
        <h1>CATALOGUE</h1>
        <div className="catalogue-nav">
          <span>Trang chủ </span>
          <span>/</span>
          <span className="active"> Catalogue</span>
        </div>
      </div>
      
      <div className="catalogue-content">
        {renderTimeline()}
        
        <div className="products-container">
          {years.map((year, index) => (
            <div 
              className="year-section" 
              key={year} 
              ref={el => yearRefs.current[year] = el}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="year-marker">
                <div className="year-dot"></div>
                <div className="year-label">{year}</div>
              </div>
              
              <div className="products-grid">
                {productsByYear[year].map((product, prodIndex) => (
                  <div 
                    className="product-card" 
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    style={{ animationDelay: `${(index * 0.15) + (prodIndex * 0.05)}s` }}
                  >
                    <div className="product-image">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <span className="product-category">{product.category}</span>
                    </div>
                    <div className="view-details">+</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedProduct && (
        <div className="product-modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-close" onClick={closeModal}>×</div>
            <div className="modal-image">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
            </div>
            <div className="modal-info">
              <h2>{selectedProduct.name}</h2>
              <p className="modal-category">{selectedProduct.category}</p>
              <p className="modal-description">
                {selectedProduct.description || 'Sản phẩm độc đáo từ Sonit Custom, được chế tác thủ công với chất liệu cao cấp. Thiết kế đột phá với đường nét tinh tế, phù hợp cho người yêu thích phong cách mạnh mẽ.'}
              </p>
              <Link to={`/catalogue/${selectedProduct.id}`} className="view-details-btn">
                Xem chi tiết sản phẩm
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <ScrollToTop />
    </div>
  );
};

export default CataloguePage; 