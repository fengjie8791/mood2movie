import React from 'react';
import MoodInput from './MoodInput';

const Mood = () => {
  return (
    <section className='mood'>
      <h1 className=''>
        Find Your <span className='color-blue'>Movie</span>{' '}
        <span className='color-purple'>Mood</span>
      </h1>
      <h2 className='margin-bottom-50 '>
        Not sure what to watch? Just tell me how you feel and I'll find
        something perfect.
      </h2>
      <MoodInput />
    </section>
  );
};

export default Mood;
