import mongoose from 'mongoose';

export interface Post {
  title: string;
  id: string;
  description: string;
  date: Date;
}

export const PostData = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
