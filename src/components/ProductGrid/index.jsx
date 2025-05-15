import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho component ProductGrid
const productGridTranslations = {
  en: {
    products: [
      {
        name: 'EXICS-13WC2',
      },
      {
        name: 'KOUKAI',
      },
      {
        name: 'Santa Fe Collection',
      },
      {
        name: 'EXICS-09SF',
      },
    ],
    title: 'Featured Products',
    viewAll: 'View All'
  },
  vi: {
    products: [
      {
        name: 'EXICS-13WC2',
      },
      {
        name: 'KOUKAI',
      },
      {
        name: 'Bộ Sưu Tập Santa Fe',
      },
      {
        name: 'EXICS-09SF',
      },
    ],
    title: 'Sản Phẩm Nổi Bật',
    viewAll: 'Xem Tất Cả'
  }
};

// Thông tin hình ảnh cho sản phẩm
const productImages = [
  '/assets/exics-13wc2.jpg',
  '/assets/koukai.jpg',
  '/assets/santa-fe.jpg',
  '/assets/exics-09sf.jpg',
];

const ProductGrid = () => {
  const { registerTranslations, language } = useLanguage();
  
  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('productGrid', productGridTranslations);
  }, [registerTranslations]);

  return (
    <section className="product-grid-slider">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="product-swiper"
      >
        {productGridTranslations[language].products.map((product, idx) => (
          <SwiperSlide key={idx}>
            <div className="product-item">
              <img src={productImages[idx]} alt={product.name} />
              <div className="product-overlay">
                <h2 className="product-name">{product.name}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductGrid; 