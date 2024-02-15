import { Model } from 'mongoose';

export type IUser = {
  name: string;
  password: string;
  email: string;
  role: 'user' | 'admin';
  address: string;
};

export type UserModel = Model<IUser, Record<string, never>>;
