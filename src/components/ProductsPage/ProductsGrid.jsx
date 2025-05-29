import React from 'react';
import { ProductCard } from './ProductCard';
import './styles.css';

const ProductsGrid = ({ products, onProductClick, viewMode = 'grid' }) => {
  return (
    <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
      {products.map((product) => (
        <ProductCard
          key={product.prodId}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
};

export { ProductsGrid };