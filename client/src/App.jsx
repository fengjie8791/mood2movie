import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import MoodResultPage from './pages/MoodResultPage';
import ComingSoon from './pages/ComingSoon';

function App() {
  const [data, setData] = useState(null);
  const [moodInputValue, setMoodInputValue] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/tmdb');
        const json = await res.json();
        // console.log(json);
        setData(json);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              setMoodInputValue={setMoodInputValue}
              moodInputValue={moodInputValue}
            />
          }
        />
        <Route path='/movie/:id' element={<MovieDetailPage />} />
        <Route
          path='/mood-result'
          element={<MoodResultPage moodInputValue={moodInputValue} />}
        />
        <Route path='/coming-soon' element={<ComingSoon />} />
      </Routes>
    </>
  );
}

export default App;
