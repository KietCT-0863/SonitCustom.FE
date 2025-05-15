import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

const products = [
  {
    image: '/assets/exics-13wc2.jpg',
    name: 'EXICS-13WC2',
  },
  {
    image: '/assets/koukai.jpg',
    name: 'KOUKAI',
  },
  {
    image: '/assets/santa-fe.jpg',
    name: 'Santa Fe Collection',
  },
  {
    image: '/assets/exics-09sf.jpg',
    name: 'EXICS-09SF',
  },
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
              <img src={product.image} alt={product.name} />
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