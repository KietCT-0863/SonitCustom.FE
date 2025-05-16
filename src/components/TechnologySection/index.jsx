import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

// Technology data in English
const techs = [
  { title: "MANUFACTURING EXCELLENCE" },
  { title: "SHAFT TECHNOLOGY" },
  { title: "BUTT DESIGN INNOVATION" },
  { title: "DEALER NETWORK" }
];

const techImages = [
  '/assets/cue-factory.jpg',
  '/assets/shaft-tech.jpg',
  '/assets/butt-tech.jpg',
  '/assets/find-dealer.jpg',
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