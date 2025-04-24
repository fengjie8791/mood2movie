import React from 'react';
import { useState } from 'react';

const MoodMovieCard = ({ title, poster, isFlipped, onFlip, isHidden }) => {
  return (
    <div
      className={`mood-flip-container ${isFlipped ? 'flipped' : ''} ${
        isHidden ? 'hide' : ''
      }`}
      onClick={onFlip}
    >
      <div className='mood-card-flipper'>
        <div className='mood-card mood-card-front'>
          <img src={poster} alt={title} />
          {/* <h3>{title}</h3> */}
        </div>
        <div className='mood-card mood-card-back'></div>
      </div>
    </div>
  );
};

export default MoodMovieCard;
