import React from 'react';
import Hero from '../../components/Hero';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import './styles.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-container">
      <HeaderContent />

        <Hero />
      </div>

    </div>

  );
};

export default HomePage; 