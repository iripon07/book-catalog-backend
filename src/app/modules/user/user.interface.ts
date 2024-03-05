import { Model } from 'mongoose';

export type IUser = {
  _id?: string;
  name: string;
  password: string;
  email: string;
  role: 'user' | 'admin';
  address: string;
};

export type UserModel = {
  isUserExist(
    id: string,
  ): Promise<Pick<IUser, '_id' | 'password' | 'role' | 'email'>>;
  isPasswordMatched(
    givenPassword: string,
    savePassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
