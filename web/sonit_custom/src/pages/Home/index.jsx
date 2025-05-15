import React from 'react';
import Hero from '../../components/Hero';
import ProductGrid from '../../components/ProductGrid';
import TechnologySection from '../../components/TechnologySection';
import './styles.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <ProductGrid />
      <TechnologySection />
    </div>
  );
};

export default HomePage; 