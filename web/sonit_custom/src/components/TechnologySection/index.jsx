import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { useLanguage, t } from '../../contexts/LanguageContext';

// Bản dịch cho component TechnologySection
const techSectionTranslations = {
  en: {
    techs: [
      {
        title: 'AVAILABLE CUE AT FACTORY',
      },
      {
        title: 'EX PRO SHAFT TECHNOLOGY',
      },
      {
        title: 'EXCEED BUTT TECHNOLOGY',
      },
      {
        title: 'FIND A DEALER',
      },
    ],
    sectionTitle: 'Our Technology'
  },
  vi: {
    techs: [
      {
        title: 'CƠ CÓ SẴN TẠI XƯỞNG',
      },
      {
        title: 'CÔNG NGHỆ THÂN CƠ EX PRO',
      },
      {
        title: 'CÔNG NGHỆ ĐẦU CƠ EXCEED',
      },
      {
        title: 'TÌM ĐẠI LÝ',
      },
    ],
    sectionTitle: 'Công Nghệ Của Chúng Tôi'
  }
};

// Thông tin hình ảnh
const techImages = [
  '/assets/cue-factory.jpg',
  '/assets/shaft-tech.jpg',
  '/assets/butt-tech.jpg',
  '/assets/find-dealer.jpg',
];

const TechnologySection = () => {
  const { registerTranslations, language } = useLanguage();
  
  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('techSection', techSectionTranslations);
  }, [registerTranslations]);

  return (
    <section className="technology-section-slider">
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
        className="tech-swiper"
      >
        {techSectionTranslations[language].techs.map((tech, idx) => (
          <SwiperSlide key={idx}>
            <div className="tech-item">
              <img src={techImages[idx]} alt={tech.title} />
              <h3 className="tech-title font-effect-emboss">{tech.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TechnologySection; 