import React, { useState } from 'react';
import './styles.css';

export const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Tìm kiếm sản phẩm..."
        className="search-input"
      />
    </div>
  );
}; 