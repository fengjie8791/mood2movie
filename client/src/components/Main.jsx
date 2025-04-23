import React from 'react';
import Mood from './Mood';
import MovieContent from './MovieContent';

const Main = (props) => {
  return (
    <main>
      <Mood
        setMoodInputValue={props.setMoodInputValue}
        moodInputValue={props.moodInputValue}
      />
      <MovieContent
        movieListData={props.movieListData}
        movieContentTitle={props.movieContentTitle}
      />
    </main>
  );
};

export default Main;
