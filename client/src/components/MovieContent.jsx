import React from 'react';
import MovieCard from './MovieCard';
import { movieGenresById } from '../constants/genres';

const MovieContent = ({ movieListData, movieContentTitle }) => {
  if (!Array.isArray(movieListData)) {
    return <div>Loading movies...</div>;
  }
  let formatmMvieContentTitle;
  console.log(movieContentTitle);
  if (typeof movieContentTitle === 'number') {
    formatmMvieContentTitle = movieGenresById[movieContentTitle];
  } else {
    formatmMvieContentTitle = movieContentTitle
      .replace(/_/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return (
    <>
      <h1 className='Movie-content-title'>{formatmMvieContentTitle}</h1>
      <div className='movie-grid'>
        {movieListData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MovieContent;
