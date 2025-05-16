import React, { useState } from 'react';
import './styles.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          <span role="img" aria-label="search">🔍</span>
        </button>
      </form>
    </div>
  );
};

export { SearchBar }; 