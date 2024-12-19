import dotenv from 'dotenv';
import app from './app.js';
import mongoose from 'mongoose';

dotenv.config();

const port = 5050;

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

export {};
