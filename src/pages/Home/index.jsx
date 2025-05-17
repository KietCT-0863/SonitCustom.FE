import React from 'react';
import Hero from '../../components/Hero';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import './styles.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-container">
        <Hero />
      </div>
      <HeaderContent />

    </div>

  );
};

export default HomePage; 