import { useState, useEffect } from 'react';
import React from 'react';
import api from '../api';
import { GENRE_NAME_TO_ID } from '../constants/genres';
import NavBar from '../components/NavBar';
import MoodMovieCard from '../components/MoodMovieCard';

const MoodResultPage = ({ moodInputValue }) => {
  const [movieList, setMovieList] = useState([]);
  const [recommendedGenre, setRecommendedGenre] = useState('Family');
  const [moodMovieCard, setMoodMovieCard] = useState([]);
  const [flipStates, setFlipStates] = useState(Array(5).fill(true));
  const [isHidden, setIshidden] = useState(false);

  const handleCardFlip = (index) => {
    setFlipStates((prev) => {
      const newFlips = [...prev];
      newFlips[index] = !newFlips[index];
      return newFlips;
    });
  };

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
      // console.log(res.data);
    } catch (err) {
      console.error(`Failed to fetch movies for genre ${genreName}:`, err);
    }
  };

  const handleRepickMovie = () => {
    console.log('repick');
    setIshidden(true);
    setFlipStates(Array(5).fill(true));

    setTimeout(() => {
      fetchMoviesByGenre(recommendedGenre);
    }, 500);
    setTimeout(() => {
      setIshidden(false);
    }, 1000);
  };

  // useEffect(() => {
  //   fetchChatgpt();
  // }, []);
  useEffect(() => {
    if (recommendedGenre) {
      fetchMoviesByGenre(recommendedGenre);
    }
  }, [recommendedGenre]);
  useEffect(() => {
    if (movieList.length > 0) {
      // console.log(movieList);
      const newMovieList = movieList.map((movie, index) => {
        return (
          <MoodMovieCard
            isHidden={isHidden}
            isFlipped={flipStates[index]}
            onFlip={() => handleCardFlip(index)}
            key={movie.id}
            title={movie.title}
            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        );
      });
      setMoodMovieCard(newMovieList);
    }
  }, [movieList, flipStates, isHidden]);

  return (
    <div>
      <NavBar />
      <div className='mood-result-container'>
        <p className='font-nav-title'>
          Based on how you're feeling, I've picked five movies in the{' '}
          <span className='color-blue'>{recommendedGenre}</span> genre for you.
        </p>
        <div className='mood-result-card-box'>{moodMovieCard}</div>
        <button className='back-button' onClick={() => handleRepickMovie()}>
          repick movie
        </button>
      </div>
    </div>
  );
};

export default MoodResultPage;
