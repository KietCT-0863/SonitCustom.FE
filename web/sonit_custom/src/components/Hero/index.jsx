import React from 'react';
import './styles.css';

const Hero = () => {
  return (
    <section className="hero-slider">
      <div className="hero-slide" style={{ backgroundImage: 'url(/assets/miyabi.jpg)' }}>
        <div className="hero-content">
          <h1 className="hero-title font-effect-neon">MIYABI</h1>
          <h2 className="hero-subtitle">Exceed Special Japan Edition</h2>
        </div>
      </div>
    </section>
  );
};

export default Hero; 