import { useState, useEffect } from 'react';
import React from 'react';
import api from '../api';
import { GENRE_NAME_TO_ID } from '../constants/genres';

const MoodResultPage = ({ moodInputValue }) => {
  const [movieList, setMovieList] = useState([]);
  const [recommendedGenre, setRecommendedGenre] = useState('');
  const fetchChatgpt = async () => {
    if (moodInputValue === '') {
      console.log('input empty');
      return;
    }
    try {
      const res = await api.post('/mood', { mood: moodInputValue });
      console.log('chatgpt res:', res.data.message);
      const genre = res.data.message;
      setRecommendedGenre(genre);
    } catch (err) {
      console.error('err:', err);
    }
  };
  const fetchMoviesByGenre = async (genreName) => {
    const genreId = GENRE_NAME_TO_ID[genreName];
    if (!genreId) {
      console.warn('Unknown genre name:', genreName);
      return;
    }

    try {
      const res = await api.get('/tmdb/gener', {
        params: {
          genreId,
        },
      });
      setMovieList(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(`Failed to fetch movies for genre ${genreName}:`, err);
    }
  };

  const handleRepickMovie = () => {
    console.log('repick');
    fetchMoviesByGenre(recommendedGenre);
  };

  useEffect(() => {
    fetchChatgpt();
  }, []);
  useEffect(() => {
    if (recommendedGenre) {
      fetchMoviesByGenre(recommendedGenre);
    }
  }, [recommendedGenre]);

  return (
    <div>
      {moodInputValue}
      <button onClick={() => handleRepickMovie()}>repick movie</button>
    </div>
  );
};

export default MoodResultPage;
