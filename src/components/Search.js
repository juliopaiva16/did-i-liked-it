// src/components/Search.js
import React from 'react';
import './Search.css';

const Search = ({ onSearch, searchTerm, onChange, closeCallback }) => {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
    if (event.key === 'Escape') {
      closeCallback();
    }
  };

  return (
    <div className="search-bar static-neomorph">
      <input
        type="text"
        placeholder="Search by album or artist"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Search;
