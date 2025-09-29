import mongoose from 'mongoose';

export async function connectDb() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/exam_crafters';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName: process.env.MONGODB_DB || 'exam_crafters' });
  console.log('MongoDB connected');
}


