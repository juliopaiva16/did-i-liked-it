// src/App.js
import React, { useState } from 'react';
import Layout from './components/Layout';
import Search from './components/Search';
import Table from './components/Table';
import Background from './components/Background';
import ReviewModal from './components/ReviewModal';
import './App.css';

// Mock data for demonstration
const _mockData = [];

function App() {
  const [mockData, setMockData] = useState(_mockData);
  const [searchResults, setSearchResults] = useState(mockData);
  const [apiSearchResults, setApiSearchResults] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewedQuery, setReviewedQuery] = useState('');
  const [apiQuery, setApiQuery] = useState('');

  const addMockData = (data) => {
    _mockData.push(data);
    setMockData(_mockData);
  };

  // Function to handle adding a review to the database
  const handleAddReview = (album, songScore, albumScore) => {
    // Implement adding the review to the database here
    // You can use selectedAlbum and user's input scores
    // Reset the modal after adding the review
    console.log('Adding review:', album, songScore, albumScore);
    // Create a new Date object using the parsed values
    addMockData({
      albumCover: album.cover_big,
      artistName: album.artist.name,
      albumName: album.title,
      albumReleaseYear: album.release_date.split('-')[0],
      dateOfReview: new Date().toLocaleDateString(),
      songsScore: parseFloat(songScore),
      albumScore: parseFloat(albumScore),
      overallScore: (songScore*0.3) + (albumScore*0.7),
      albumLink: album.link,
      artistLink:
        album.artist.picture
        .replace('/image', '')
        .replace('api.deezer.com', 'www.deezer.com'),
    });
  };
  
  const handleSearch = async () => {
    if (!isReviewModalOpen) {
      // Implement search logic and update searchResults state
      // For now, just filter mock data as an example
      setSearchResults(
        mockData.filter((item) =>
          item.albumName.toLowerCase().includes(reviewedQuery.toLowerCase()) ||
          item.artistName.toLowerCase().includes(reviewedQuery.toLowerCase())
        )
      );
    } else {
      // Function to handle the search request to Deezer API
      if (!apiQuery || apiQuery.length === 0) {
        // If search query is empty, return
        return;
      }
      try {
        const results = await searchAlbums(apiQuery);
        // Convert the response body from readable stream to JSON
        const response = await results.json();
        console.log(response);
        // Update searchResults state with the data
        setApiSearchResults(response.data);
      } catch (error) {
        console.error('Error searching for albums:', error);
      }
      console.log('Search res:', searchResults);
    }
  };

  const searchAlbums = async (query) => {
    // Make a request to Deezer API to search for albums
    // using proxy server to avoid CORS issue (see package.json)
    return fetch(
      '/search/album/?q=' + query);
  }
  
  // Function to toggle the modal's visibility
  const goBackToApiSearchModal = () => {
    setApiQuery('');
    setApiSearchResults([]);
    setIsReviewModalOpen(true);
  };

  // Handle modal close on background click or ESC key press
  const goBackToReviewed = () => {
    setReviewedQuery('');
    setSearchResults(mockData);
    setIsReviewModalOpen(false);
  };


  return (
    <Layout>
      <Background onBackgroundCreated={() => {}} />
      { /* Review modal close button */
      isReviewModalOpen &&
      <button
        className='close-button neomorph'
        onClick={goBackToReviewed}
      >
        X
      </button>
      }
      {/* Logo and searchbar */}
      <div className='main-header'>
        <h1 className='app-font-logo'>Did I Liked it?</h1>
        <Search
          onSearch={handleSearch}
          searchTerm={isReviewModalOpen ? apiQuery : reviewedQuery}
          onChange={isReviewModalOpen ? setApiQuery : setReviewedQuery}
          closeCallback={goBackToReviewed}
        />
      </div>
      {/* Reviewed songs Table OR API Search*/}
      <div className='main-middle'>
        { /* Search results table */
        !isReviewModalOpen &&
        searchResults.length > 0 &&
        <Table data={searchResults} />
        }
        { /* Review modal */
        isReviewModalOpen &&
        <ReviewModal
          closeCallback={goBackToReviewed}
          addReviewCallback={handleAddReview}
          searchResults={apiSearchResults}
        />
        }
      </div>
      {/* New review button */}
      <div className='main-footer'>
        <button
          onClick={goBackToApiSearchModal}
          className='neomorph add-review-button'
        >
          New Review
        </button>
      </div>
    </Layout>
  );
}

export default App;
