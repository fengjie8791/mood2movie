const movieController = {};
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

movieController.getMovie = (req, res, next) => {
  async function fetchMovieById(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      res.locals.movie = data;
      return next();
    } catch (error) {
      console.error('Fetch failed:', error.message);
    }
  }
  fetchMovieById(550);
};

export default movieController;
