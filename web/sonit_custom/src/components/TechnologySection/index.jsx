import React from 'react';
import './styles.css';

const TechnologySection = () => {
  return (
    <section className="technology-section">
      <div className="tech-item">
        <img src="/assets/cue-factory.jpg" alt="Factory" />
        <h3 className="tech-title font-effect-emboss">AVAILABLE CUE AT FACTORY</h3>
      </div>
      <div className="tech-item">
        <img src="/assets/shaft-tech.jpg" alt="Shaft Technology" />
        <h3 className="tech-title font-effect-emboss">EX PRO SHAFT TECHNOLOGY</h3>
      </div>
      <div className="tech-item">
        <img src="/assets/butt-tech.jpg" alt="Butt Technology" />
        <h3 className="tech-title font-effect-emboss">EXCEED BUTT TECHNOLOGY</h3>
      </div>
      <div className="tech-item">
        <img src="/assets/find-dealer.jpg" alt="Find a Dealer" />
        <h3 className="tech-title font-effect-emboss">FIND A DEALER</h3>
      </div>
    </section>
  );
};

export default TechnologySection; 