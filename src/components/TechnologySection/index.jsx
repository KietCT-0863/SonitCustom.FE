import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

const techs = [
  {
    image: '/assets/cue-factory.jpg',
    title: 'AVAILABLE CUE AT FACTORY',
  },
  {
    image: '/assets/shaft-tech.jpg',
    title: 'EX PRO SHAFT TECHNOLOGY',
  },
  {
    image: '/assets/butt-tech.jpg',
    title: 'EXCEED BUTT TECHNOLOGY',
  },
  {
    image: '/assets/find-dealer.jpg',
    title: 'FIND A DEALER',
  },
];

const TechnologySection = () => {
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
        {techs.map((tech, idx) => (
          <SwiperSlide key={idx}>
            <div className="tech-item">
              <img src={tech.image} alt={tech.title} />
              <h3 className="tech-title font-effect-emboss">{tech.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TechnologySection; 