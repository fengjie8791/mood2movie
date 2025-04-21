import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>用户列表</h1>
      {data ? (
        data.map((user, i) => (
          <div key={i}>
            <strong>{user.username}</strong> - {user.password}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
