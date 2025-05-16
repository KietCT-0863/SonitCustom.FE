import React from 'react';
import Hero from '../../components/Hero';
import ProductGrid from '../../components/ProductGrid';
import TechnologySection from '../../components/TechnologySection';
import './styles.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-container">
        <Hero />
      </div>
      
      <div className="container">
        <div className="section-title">
          <h2>FEATURED PRODUCTS</h2>
        </div>
        <ProductGrid />
      </div>
      
      <div className="container">
        <div className="section-title">
          <h2>OUR TECHNOLOGY</h2>
        </div>
        <TechnologySection />
      </div>
    </div>
  );
};

export default HomePage; 