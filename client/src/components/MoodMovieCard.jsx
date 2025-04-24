import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MoodMovieCard = ({
  title,
  poster,
  isFlipped,
  onFlip,
  isHidden,
  movieId,
}) => {
  return (
    <div
      className={`mood-flip-container ${isFlipped ? 'flipped' : ''} ${
        isHidden ? 'hide' : ''
      }`}
      onClick={onFlip}
    >
      <div className='mood-card-flipper'>
        <div className='mood-card mood-card-front'>
          <div className='mood-card-front-content-box'>
            <img src={poster} alt={title} />
            <Link to={`/movie/${movieId}`}>
              <div className='mood-card-front-content'>
                <p className='font-card-front-title'>{title}</p>
                <p className='font-card-front-show-more'>Show More</p>
              </div>
            </Link>
          </div>
        </div>

        <div className='mood-card mood-card-back'></div>
      </div>
    </div>
  );
};

export default MoodMovieCard;
