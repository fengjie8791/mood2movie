import { useState, useEffect } from 'react';
import MoodInput from './components/MoodInput';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/tmdb');
        const json = await res.json();
        // console.log(json);
        setData(json);
        console.log(data);
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
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
