import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.CHAT_GPT_KEY,
});

// Valid TMDB movie genres
const movieGenres = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Science Fiction',
  'TV Movie',
  'Thriller',
  'War',
  'Western',
];

const chatgptController = {};

chatgptController.generateMovieGenres = async (req, res, next) => {
  const { mood } = req.body;

  if (!mood) {
    return res.status(400).json({ error: 'Mood input is required.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that suggests movie genres based on the user's mood. You must respond ONLY with a String of genres Only have one genre (e.g., "Comedy"). Do not include any extra explanation or text. The genres must be selected only from this list: ${movieGenres.join(
            ', '
          )}.`,
        },
        {
          role: 'user',
          content: `My mood is: ${mood}`,
        },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.locals.movieGenres = reply;
    return next();
  } catch (err) {
    console.error('Error generating genres from ChatGPT:', err);
    return res.status(500).json({ error: 'Failed to generate movie genres.' });
  }
};

export default chatgptController;
