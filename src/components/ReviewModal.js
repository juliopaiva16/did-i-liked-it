import React, { useState } from 'react';
import './ReviewModal.css';

const ReviewModal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const searchAlbums = async (query) => {
    // Make a request to Deezer API to search for albums
    // using proxy server to avoid CORS issue (see package.json)
    return fetch(
      '/search/album/?q=' + query);
  }

  // Function to handle the search request to Deezer API
  const handleSearch = async () => {
    try {
      const results = await searchAlbums(searchQuery);
      // Convert the response body from readable stream to JSON
      const response = await results.json();
      console.log(response);
      // Update searchResults state with the data
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for albums:', error);
    }
  };

  // Function to handle selecting an album from the search results
  const handleSelectAlbum = (album) => {
    setSelectedAlbum(album);
  };

  // Function to handle adding a review to the database
  const handleAddReview = () => {
    // Implement adding the review to the database here
    // You can use selectedAlbum and user's input scores
    // Reset the modal after adding the review
  };

  return (
    <div className="modal-container">
      <div className="review-modal">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for an album or artist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((album) => (
              <div key={album.id} onClick={() => handleSelectAlbum(album)}>
                <img src={album.cover_medium} alt={album.title} />
                <div>{album.title}</div>
                <div>{album.artist.name}</div>
                <div>Release Year: {album.release_date}</div>
              </div>
            ))}
          </div>
        )}
        {selectedAlbum && (
          <div className="selected-album">
            <img src={selectedAlbum.cover} alt={selectedAlbum.title} />
            <div>{selectedAlbum.title}</div>
            <div>{selectedAlbum.artist.name}</div>
            <div>Release Year: {selectedAlbum.release_date}</div>
            {/* Input fields for user's scores */}
            <input type="text" placeholder="Songs Score" />
            <input type="text" placeholder="Album Score" />
            <input type="text" placeholder="Overall Score" />
            <button onClick={handleAddReview}>Add Review</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
