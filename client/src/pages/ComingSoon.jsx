import React from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const ComingSoon = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <div className='mood-result-container'>
        <p className='font-nav-title'>Coming Soon</p>
        <button className='back-button' onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
