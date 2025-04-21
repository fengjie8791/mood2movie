import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { User } from './models/model.js';
import userController from './controllers/controller.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get('/api', userController.getUsers, (req, res) => {
  console.log(123);
  res.status(200).json(res.locals.users);
});

app.listen(port, () => {
  console.log(`Server is listing on port ${port}`);
});
