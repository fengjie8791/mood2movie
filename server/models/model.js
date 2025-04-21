import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
});

const User = mongoose.model('users', userSchema);

export { User };
