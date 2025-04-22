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
  movieController.getNowPlaying,
  (req, res) => {
    // console.log(123);
    res.status(200).json(res.locals.nowPlaying);
  }
);

router.post('/mood', chatgptController.generateMovieGenres, (req, res) => {
  // console.log(123);
  res.status(200).json({ message: res.locals.movieGenres });
});
export default router;
