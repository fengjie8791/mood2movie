import axios from 'axios';

const movieController = {};
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

movieController.getMovie = (req, res, next) => {
  async function fetchMovieById(movieId) {
    const movieUrl = `${BASE_URL}/movie/${movieId}`;
    const creditsUrl = `${BASE_URL}/movie/${movieId}/credits`;

    try {
      const [movieRes, creditsRes] = await Promise.all([
        axios.get(movieUrl, {
          params: {
            api_key: TMDB_API_KEY,
            language: 'en-US',
          },
        }),
        axios.get(creditsUrl, {
          params: {
            api_key: TMDB_API_KEY,
            language: 'en-US',
          },
        }),
      ]);

      const movie = movieRes.data;
      const credits = creditsRes.data;

      const cast = credits.cast.slice(0, 6).map((actor) => ({
        name: actor.name,
        character: actor.character,
        profile_path: actor.profile_path,
      }));

      res.locals.movie = {
        ...movie,
        cast,
      };

      return next();
    } catch (error) {
      console.error('Error fetching movie or credits:', error.message);
      return res.status(500).json({ error: 'Failed to fetch movie details' });
    }
  }

  fetchMovieById(req.params.id);
};

movieController.getMovieList = async (req, res, next) => {
  const { type, genreId } = req.query;
  // console.log('type', type);
  // console.log('genreId', genreId);

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
movieController.getMovieByGenre = async (req, res, next) => {
  const { genreId } = req.query;

  if (!genreId) {
    return res.status(400).json({ error: 'Missing genreId parameter.' });
  }

  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        sort_by: 'popularity.desc',
        with_genres: genreId,
        page: 1,
      },
    });

    const movies = response.data.results;
    const shuffled = movies.sort(() => 0.5 - Math.random());
    const selectedMovies = shuffled.slice(0, 5);

    res.locals.genreMovies = selectedMovies;
    return next();
  } catch (err) {
    console.error('Error fetching movies by genre:', err);
    return res.status(500).json({ error: 'Failed to fetch movies by genre.' });
  }
};

export default movieController;
