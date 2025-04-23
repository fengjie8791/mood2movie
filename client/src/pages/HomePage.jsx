import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import api from '../api';

const HomePage = () => {
  const [sideBarBtn, setSideBarBtn] = useState('now_playing');
  const [movieData, setMovieData] = useState(null);
  const handleClickSideBarBtn = (value) => {
    setSideBarBtn(value);
  };
  const fetchData = async (type = 'now_playing') => {
    try {
      const res = await api.get(`/tmdb?type=${type}`);
      setMovieData(res.data);
      console.log('Fetched data:', res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };
  useEffect(() => {
    fetchData(sideBarBtn);
  }, [sideBarBtn]);

  if (!movieData) return <p>Loading...</p>;
  return (
    <div>
      <NavBar />
      <div className='container'>
        <Sidebar handleClickSideBarBtn={handleClickSideBarBtn} />
        <Main MovieListData={movieData} />
      </div>
    </div>
  );
};

export default HomePage;
