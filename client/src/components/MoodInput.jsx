import { useState } from 'react';
import React from 'react';
import api from '../api.js';

const MoodInput = () => {
  const [inputValue, setInputValue] = useState('');
  // console.log(inputValue);
  const handleClickMood = async () => {
    if (inputValue === '') {
      console.log('input empty');
      return;
    }
    try {
      const res = await api.post('/mood', { mood: inputValue });
      console.log('res:', res);
    } catch (err) {
      console.error('err:', err);
    }
  };
  return (
    <div>
      <label htmlFor=''>What's your mood now?</label>
      <input
        id='mood'
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        type='text'
      />
      <button onClick={() => handleClickMood()}>Submit</button>
    </div>
  );
};

export default MoodInput;
