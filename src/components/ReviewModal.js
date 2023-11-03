import React, { useState } from 'react';

// Function to search for albums using the Deezer API
const searchAlbums = async (query) => {
  try {
    const response = await fetch(`https://api.deezer.com/search/album/?q=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data; // Assuming the albums data is in the 'data' property of the response
  } catch (error) {
    console.error('Error fetching albums:', error);
    return [];
  }
};

const ReviewModal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // Function to handle the search request to Deezer API
  const handleSearch = async () => {
    try {
      const results = await searchAlbums(searchQuery);
      setSearchResults(results);
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
                <img src={album.cover} alt={album.title} />
                <div>{album.title}</div>
                <div>{album.artist.name}</div>
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
