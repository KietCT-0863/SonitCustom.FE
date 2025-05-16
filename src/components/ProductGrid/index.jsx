import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

// Product data in English
const products = [
  { name: "EXICS 13WC-2" },
  { name: "KOUKAI PREMIUM" },
  { name: "SANTA FE CUSTOM" },
  { name: "EXICS 09SF" }
];

const productImages = [
  '/assets/exics-13wc2.jpg',
  '/assets/koukai.jpg',
  '/assets/santa-fe.jpg',
  '/assets/exics-09sf.jpg',
];

const ProductGrid = () => {
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
        {products.map((product, idx) => (
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