import { User } from '../models/model.js';

const userController = {};

userController.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.locals.users = users;
    next();
  } catch (err) {
    next(err);
  }
};

export default userController;
