import axios from 'axios';

const movieController = {};
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

movieController.getMovie = (req, res, next) => {
  async function fetchMovieById(movieId) {
    const url = `${BASE_URL}/movie/${movieId}`;

    try {
      const response = await axios.get(url, {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
        },
      });

      res.locals.movie = response.data;
      return next();
    } catch (error) {
      console.error('Axios request failed:', error.message);
    }
  }

  fetchMovieById(111);
};
movieController.getNowPlaying = async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/now_playing',
      {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
          page: 1,
          region: 'US',
        },
      }
    );
    // console.log(response.data.results);
    res.locals.nowPlaying = response.data.results;
    next();
  } catch (err) {
    console.error('Error fetching now playing movies:', err);
  }
};

export default movieController;
