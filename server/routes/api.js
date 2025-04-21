import express from 'express';
import userController from '../controllers/controller.js';
import movieController from '../controllers/movieController.js';

const router = express.Router();

router.get('/', userController.getUsers, (req, res) => {
  console.log(TMDB_API_KEY);
  // console.log(123);
  res.status(200).json(res.locals.users);
});
router.get('/tmdb', movieController.getMovie, (req, res) => {
  // console.log(123);
  res.status(200).json(res.locals.movie);
});
export default router;
