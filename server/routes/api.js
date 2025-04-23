import express from 'express';
import userController from '../controllers/controller.js';
import movieController from '../controllers/movieController.js';
import chatgptController from '../controllers/chatgptController.js';

const router = express.Router();

router.get('/', userController.getUsers, (req, res) => {
  console.log(TMDB_API_KEY);
  // console.log(123);
  res.status(200).json(res.locals.users);
});
router.get(
  '/tmdb',
  // movieController.getMovie,
  movieController.getMovieList,
  (req, res) => {
    // console.log(123);
    res.status(200).json(res.locals.movieList);
  }
);
router.get('/tmdb/movie/:id', movieController.getMovie, (req, res) => {
  res.status(200).json(res.locals.movie);
});

router.post('/mood', chatgptController.generateMovieGenres, (req, res) => {
  res.status(200).json({ message: res.locals.movieGenres });
});

router.get('/tmdb/gener', movieController.getMovieByGenre, (req, res) => {
  res.status(200).json(res.locals.genreMovies);
});
export default router;
