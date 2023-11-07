import React, { useState } from 'react';
import './ReviewModal.css';

const ReviewModal = ({
  addCallback,
  searchResults,
  addReviewCallback,
}) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [songScore, setSongScore] = useState(0);
  const [albumScore, setAlbumScore] = useState(0);

  // Get album details from Deezer API
  const getAlbumDetails = async (albumId) => {
    // Make a request to Deezer API to get album details
    // using proxy server to avoid CORS issue (see package.json)
    return fetch(
      '/album/?id=' + albumId);
  }

  // Function to handle selecting an album from the search results
  const handleSelectAlbum = async (album) => {
    const result = await getAlbumDetails(album.id);
    result.json().then((data) => {
      setSelectedAlbum(data);
    });
    console.log('Selected album:', selectedAlbum);
  };

  // Function to handle adding a review to the database
  const handleAddReview = () => {
    // Implement adding the review to the database here
    // You can use selectedAlbum and user's input scores
    // Reset the modal after adding the review
    addReviewCallback(selectedAlbum, songScore, albumScore);
    setSelectedAlbum(null);
  };
  
  // Function to handle the user's input for song score
  const handleSongScore = (event) => {
    setSongScore(event.target.value);
  };

  // Function to handle the user's input for album score
  const handleAlbumScore = (event) => {
    setAlbumScore(event.target.value);
  };

  return (
      <div className="modal-container">
        <div className="modal-card">
          {searchResults.length > 0 && !selectedAlbum && (
            <div className="search-results">
              {searchResults.map((album) => (
                <div key={album.id} onClick={() => handleSelectAlbum(album)} className='album-card neomorph'>
                  <div className="album-cover">
                    <img src={album.cover} alt={album.title} />
                  </div>
                  <div className='album-info'>
                    <div>{album.title}</div>
                    <div>{album.artist.name}</div>
                    <div>{album.nb_tracks} tracks</div>
                    </div>
                </div>
              ))}
            </div>
          )}
          {selectedAlbum && (
            <div className="search-results">
              <div className="album-card static-neomorph">
                <div className="album-cover-big">
                  <img src={selectedAlbum.cover_big} alt={selectedAlbum.title} />
                </div>
                <div className='album-column'>
                  <div className='album-info'>
                    <div>{selectedAlbum.title}</div>
                    <div>{selectedAlbum.artist.name}</div>
                    <div>{selectedAlbum.nb_tracks} tracks</div>
                  </div>
                  <div className='album-info'>
                    {/* Input fields for user's scores */}
                    <label>Songs Score</label>
                    <input className='neomorph' type="number" placeholder="Songs Score" onChange={handleSongScore}/>
                    <label>Album Score</label>
                    <input className='neomorph' type="number" placeholder="Album Score" onChange={handleAlbumScore}/>
                  </div>
                  <button
                    className='neomorph add-review-button'
                    onClick={handleAddReview}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ReviewModal;
