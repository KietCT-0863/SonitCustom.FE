import React from 'react';
import './styles.css';

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <div className="page-banner">
        <h1>About Sonit Custom</h1>
        <p>Crafting premium billiard equipment since 2010</p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2010, Sonit Custom began as a small workshop dedicated to crafting high-quality 
            custom billiard cues. What started as a passion project has grown into a leading manufacturer 
            of premium billiard equipment trusted by professionals and enthusiasts worldwide.
          </p>
          
          <p>
            Our commitment to exceptional craftsmanship, innovative design, and outstanding performance 
            has established Sonit Custom as a respected name in the billiards industry.
          </p>
        </div>
        
        <div className="about-image">
          <img src="/assets/about-workshop.jpg" alt="Sonit Custom Workshop" />
        </div>
        
        <div className="mission-vision">
          <div className="mission">
            <h3>Our Mission</h3>
            <p>
              To create superior billiard equipment that enhances player performance through innovative 
              design, premium materials, and meticulous attention to detail.
            </p>
          </div>
          
          <div className="vision">
            <h3>Our Vision</h3>
            <p>
              To be recognized globally as the premier manufacturer of custom billiard equipment, 
              setting new standards for quality, performance, and design.
            </p>
          </div>
        </div>
        
        <div className="team-section">
          <h2>Our Team</h2>
          <p>
            Our team consists of skilled craftsmen, engineers, and billiards enthusiasts who share 
            a common passion for the game and commitment to excellence.
          </p>
          
          <div className="team-members">
            <div className="team-member">
              <img src="/assets/team-member1.jpg" alt="Team Member" />
              <h4>John Smith</h4>
              <p>Founder & Master Craftsman</p>
            </div>
            
            <div className="team-member">
              <img src="/assets/team-member2.jpg" alt="Team Member" />
              <h4>Jane Doe</h4>
              <p>Lead Designer</p>
            </div>
            
            <div className="team-member">
              <img src="/assets/team-member3.jpg" alt="Team Member" />
              <h4>Michael Johnson</h4>
              <p>Technical Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage; 