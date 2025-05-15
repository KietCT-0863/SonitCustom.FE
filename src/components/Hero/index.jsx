import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho component Hero
const heroTranslations = {
  en: {
    slides: [
      {
        title: 'MIYABI',
        subtitle: 'Exceed Special Japan Edition',
      },
      {
        title: 'KOUKAI',
        subtitle: 'Classic Craftsmanship',
      },
      {
        title: 'SANTA FE',
        subtitle: 'Santa Fe Collection',
      },
    ]
  },
  vi: {
    slides: [
      {
        title: 'MIYABI',
        subtitle: 'Phiên Bản Đặc Biệt Nhật Bản',
      },
      {
        title: 'KOUKAI',
        subtitle: 'Thủ Công Kinh Điển',
      },
      {
        title: 'SANTA FE',
        subtitle: 'Bộ Sưu Tập Santa Fe',
      },
    ]
  }
};

// Thông tin hình ảnh của slides 
const slideImages = [
  '/assets/miyabi.jpg',
  '/assets/koukai.jpg',
  '/assets/santa-fe.jpg',
];

const Hero = () => {
  const { registerTranslations, language } = useLanguage();
  
  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('hero', heroTranslations);
  }, [registerTranslations]);

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
        {heroTranslations[language].slides.map((slide, idx) => (
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