import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';
import NavBar from '../components/NavBar';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await api.get(`/tmdb/movie/${id}`);
      setMovie(res.data);
      console.log('movie', res.data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <NavBar />
      <div
        className='movie-detail-container'
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className='movie-detail-wrapper'>
          <div className='movie-detail-btn-box'>
            <button className='back-button' onClick={() => navigate('/')}>
              Back to Home
            </button>
            <button
              className='back-button'
              onClick={() => navigate('/coming-soon')}
            >
              Add to Favortie
            </button>
          </div>
          <div className='movie-detail-content'>
            <h1 className='title'>{movie.title}</h1>
            <p className='tagline'>{movie.tagline}</p>
            <p className='overview'>{movie.overview}</p>
            <p>
              <strong className='color-blue'>Genres:</strong>
              {movie.genres.map((genre) => {
                return <span key={genre.id}> {genre.name} </span>;
              })}
            </p>
            <p>
              <strong className='color-blue'>Release Date:</strong>{' '}
              {movie.release_date}
            </p>
            <p>
              <strong className='color-blue'>Runtime:</strong> {movie.runtime}{' '}
              min
            </p>
            <p>
              <strong className='color-blue'>Rating:</strong>{' '}
              {movie.vote_average} ({movie.vote_count} votes)
            </p>

            <p>
              <strong className='color-blue'>Original Language:</strong>{' '}
              {movie.original_language}
            </p>
            <p>
              <strong className='color-blue'>Production Countries:</strong>{' '}
              {movie.production_countries.map((c) => c.name).join(', ')}
            </p>
            <p>
              <strong className='color-blue'>IMDB ID:</strong> {movie.imdb_id}
            </p>
            <div className='casts-container'>
              {movie.cast.map((cast, index) => (
                <div key={index} className='cast-card'>
                  <img
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                        : `/src/assets/images/cast-placeholder.jpg`
                    }
                    alt={cast.name}
                    className='cast-image'
                  />
                  <p className='cast-name'>{cast.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='movie-detail-poster'>
            <a href={movie.homepage} rel='noopener noreferrer'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
