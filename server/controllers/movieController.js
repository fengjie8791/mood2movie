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
movieController.getMovieList = async (req, res, next) => {
  const { type, genreId } = req.query;
  console.log('type', type);
  console.log('genreId', genreId);

  const baseUrl = genreId
    ? 'https://api.themoviedb.org/3/discover/movie'
    : `https://api.themoviedb.org/3/movie/${type || 'now_playing'}`;

  const params = {
    api_key: TMDB_API_KEY,
    language: 'en-US',
    page: 1,
    region: 'US',
  };

  if (genreId) {
    params.with_genres = genreId;
  }

  try {
    const response = await axios.get(baseUrl, { params });
    res.locals.movieList = response.data.results;
    next();
  } catch (err) {
    console.error('Error fetching movie list:', err);
    res.status(500).json({ error: 'Failed to fetch movie list' });
  }
};

export default movieController;
