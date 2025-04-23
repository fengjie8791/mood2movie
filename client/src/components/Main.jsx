import React from 'react';
import Mood from './Mood';
import MovieContent from './MovieContent';

const Main = (props) => {
  return (
    <main>
      <Mood />
      <MovieContent movieListData={props} />
    </main>
  );
};

export default Main;
