import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className='movie-card'>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className='movie-poster'
      />
      <h2 className='movie-title'>{movie.title}</h2>
      <p className='movie-release'>Release Date: {movie.release_date}</p>
      <p className='movie-overview'>{movie.overview}</p>
    </div>
  );
};

export default MovieCard;
