import mongoose from 'mongoose';

export interface User {
  name: string;
  id: string;
  email: string;
  password: string;
  date: Date;
  salt: string;
}

export const UserData = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  salt: { type: String },
});
