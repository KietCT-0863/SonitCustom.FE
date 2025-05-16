import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

// Slides data in English
const slides = [
  {
    title: "PREMIUM CRAFTSMANSHIP",
    subtitle: "Experience the excellence of handcrafted cues"
  },
  {
    title: "PERFORMANCE TECHNOLOGY",
    subtitle: "Advanced engineering for superior gameplay"
  },
  {
    title: "CUSTOM EXCELLENCE",
    subtitle: "Personalized design for your unique style"
  }
];

// Thông tin hình ảnh của slides 
const slideImages = [
  '/assets/miyabi.jpg',
  '/assets/koukai.jpg',
  '/assets/santa-fe.jpg',
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
              style={{ backgroundImage: `url(${slideImages[idx]})` }}
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