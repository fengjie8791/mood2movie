import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/tmdb');
        const json = await res.json();
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
      <h1>Movie</h1>

      <p>Adult: {data.adult.toString()}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
        alt='Movie backdrop'
      />
    </>
  );
}

export default App;
