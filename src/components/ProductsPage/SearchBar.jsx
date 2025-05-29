import React, { useState } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

export const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
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
      {searchTerm && (
        <button onClick={handleClear} className="search-clear-button">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
      <button onClick={handleSearch} className="search-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}; 