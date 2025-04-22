import { useState, useEffect } from 'react';
import './App.css';
import MoodInput from './components/MoodInput';

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
      <h1>Movie</h1>
      {data.map((movie, index) => {
        return (
          <div key={index}>
            <p>{movie.original_title}</p>
            {/* <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            /> */}
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          </div>
        );
      })}

      <MoodInput />
    </>
  );
}

export default App;
