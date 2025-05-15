import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

const slides = [
  {
    image: '/assets/miyabi.jpg',
    title: 'MIYABI',
    subtitle: 'Exceed Special Japan Edition',
  },
  {
    image: '/assets/koukai.jpg',
    title: 'KOUKAI',
    subtitle: 'Classic Craftsmanship',
  },
  {
    image: '/assets/santa-fe.jpg',
    title: 'SANTA FE',
    subtitle: 'Santa Fe Collection',
  },
];

const Hero = () => {
  return (
    <section className="hero-slider">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        slidesPerView={1}
        className="hero-swiper"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="hero-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-content">
                <h1 className="hero-title font-effect-neon">{slide.title}</h1>
                <h2 className="hero-subtitle">{slide.subtitle}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero; 