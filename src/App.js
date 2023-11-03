// src/App.js
import React, { useState } from 'react';
import Layout from './components/Layout';
import Search from './components/Search';
import Table from './components/Table';
import Background from './components/Background';
import ReviewModal from './components/ReviewModal';
import './App.css';

// Mock data for demonstration
const mockData = [
  {
    id: 1,
    albumCover: 'album1.jpg',
    artistName: 'Artist A',
    albumName: 'Album X',
    albumReleaseYear: 2020,
    dateOfReview: '2023-11-01',
    songsScore: 4.5,
    albumScore: 4.0,
    overallScore: 4.3,
  },
  {
    id: 2,
    albumCover: 'album2.jpg',
    artistName: 'Artist B',
    albumName: 'Album Y',
    albumReleaseYear: 2018,
    dateOfReview: '2023-10-15',
    songsScore: 3.8,
    albumScore: 4.2,
    overallScore: 4.0,
  },
  {
    id: 3,
    albumCover: 'album3.jpg',
    artistName: 'Artist C',
    albumName: 'Album Z',
    albumReleaseYear: 2022,
    dateOfReview: '2023-09-20',
    songsScore: 4.0,
    albumScore: 3.5,
    overallScore: 3.8,
  },
  // Add more objects as needed
];

function App() {
  const [searchResults, setSearchResults] = useState(mockData);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  
  const handleSearch = (searchTerm) => {
    // Implement search logic and update searchResults state
    // For now, just filter mock data as an example
    setSearchResults(
      mockData.filter((item) =>
        item.albumName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.artistName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );  
  };
  
    // Function to toggle the modal's visibility
    const toggleReviewModal = () => {
      setIsReviewModalOpen(!isReviewModalOpen);
    };

  return (
    <Layout>
      <Background onBackgroundCreated={() => {}} />
      <h1 className='app-font-logo'>Did I Liked it?</h1>
      <Search onSearch={handleSearch} />
      <Table data={searchResults} />
    </Layout>
  );
}

export default App;
