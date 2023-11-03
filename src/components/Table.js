import React from 'react';
import './Table.css';

const Table = ({ data }) => {
  return (
    <table>
      {/* Table headers */}
      <thead>
        <tr>
          <th></th>
          <th>Artist</th>
          <th>Album</th>
          <th>Release Year</th>
          <th>Date of Review</th>
          <th>Songs Score</th>
          <th>Album Score</th>
          <th>Overall Score</th>
        </tr>
      </thead>
      {/* Table body */}
      <tbody>
        {/* Map over your data to create table rows */}
        {data.map((item) => (
          <tr key={item.id}>
            {/* Populate table cells with item data */}
            <td className='cover-line'>
                <div className="album-cover">
                    <img src={item.albumCover} alt="Album Cover" />
                </div>
            </td>
            <td>{item.artistName}</td>
            <td>{item.albumName}</td>
            <td>{item.albumReleaseYear}</td>
            <td>{item.dateOfReview}</td>
            <td>{item.songsScore}</td>
            <td>{item.albumScore}</td>
            <td>{item.overallScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
