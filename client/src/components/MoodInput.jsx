import { useState } from 'react';
import React from 'react';
import api from '../api.js';
import { useNavigate } from 'react-router-dom';

const MoodInput = ({ setMoodInputValue, moodInputValue }) => {
  const navigate = useNavigate();
  // const handleClickMood = async () => {
  //   if (inputValue === '') {
  //     console.log('input empty');
  //     return;
  //   }
  //   try {
  //     const res = await api.post('/mood', { mood: inputValue });
  //     console.log('res:', res);
  //   } catch (err) {
  //     console.error('err:', err);
  //   }
  // };
  return (
    <div className='mood-input-box'>
      <input
        placeholder={`What's your mood?`}
        id='mood'
        value={moodInputValue}
        onChange={(e) => {
          setMoodInputValue(e.target.value);
        }}
        type='text'
      />
      <button
        onClick={() => {
          if (moodInputValue === '') return;
          navigate('/mood-result');
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default MoodInput;
