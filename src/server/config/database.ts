// src/server/config/database.ts
import mongoose from 'mongoose';
export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);
};
