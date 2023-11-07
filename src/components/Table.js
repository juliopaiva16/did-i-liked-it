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
            <td>
              <a href={item.artistLink}>{item.artistName}</a>
            </td>
            <td>
              <a href={item.albumLink}>{item.albumName}</a>
            </td>
            <td>{item.albumReleaseYear}</td>
            <td>{item.dateOfReview}</td>
            <td>{item.songsScore.toFixed(1)}</td>
            <td>{item.albumScore.toFixed(1)}</td>
            <td>{item.overallScore.toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
