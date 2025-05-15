import React from 'react';
import './styles.css';

const ProductGrid = () => {
  return (
    <section className="product-grid">
      <div className="product-item">
        <img src="/assets/exics-13wc2.jpg" alt="EXICS-13WC2" />
        <div className="product-overlay">
          <h2 className="product-name">EXICS-13WC2</h2>
        </div>
      </div>
      <div className="product-item">
        <img src="/assets/koukai.jpg" alt="KOUKAI" />
        <div className="product-overlay">
          <h2 className="product-name">KOUKAI</h2>
        </div>
      </div>
      <div className="product-item">
        <img src="/assets/santa-fe.jpg" alt="Santa Fe Collection" />
        <div className="product-overlay">
          <h2 className="product-name">Santa Fe Collection</h2>
        </div>
      </div>
      <div className="product-item">
        <img src="/assets/exics-09sf.jpg" alt="EXICS-09SF" />
        <div className="product-overlay">
          <h2 className="product-name">EXICS-09SF</h2>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid; 