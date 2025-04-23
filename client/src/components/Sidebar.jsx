import React from 'react';

const Sidebar = ({ handleClickSideBarBtn }) => {
  return (
    <section className='side-bar'>
      <p className='font-nav-title side-bar-title'>Movies</p>
      <div className='side-bar-btn-box'>
        <button
          onClick={() => handleClickSideBarBtn('now_playing')}
          className='side-bar-btn'
        >
          Now Playing
        </button>
        <button
          onClick={() => handleClickSideBarBtn('popular')}
          className='side-bar-btn'
        >
          Popular
        </button>
        <button
          onClick={() => handleClickSideBarBtn('top_rated')}
          className='side-bar-btn'
        >
          Top Rated
        </button>
        <button
          onClick={() => handleClickSideBarBtn('upcoming')}
          className='side-bar-btn'
        >
          Upcoming
        </button>
      </div>
      <p className='font-nav-title side-bar-title'>Genres</p>
      <div className='side-bar-btn-box'>
        <button className='side-bar-btn'>Action</button>
        <button className='side-bar-btn'>Comedy</button>
        <button className='side-bar-btn'>Drama</button>
        <button className='side-bar-btn'>Fantasy</button>
        <button className='side-bar-btn'>Horror</button>
        <button className='side-bar-btn'>Romance</button>
        <button className='side-bar-btn'>Science Fiction</button>
        <button className='side-bar-btn'>Thriller</button>
      </div>
    </section>
  );
};

export default Sidebar;
