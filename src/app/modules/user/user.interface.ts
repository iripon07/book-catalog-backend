import { Model } from 'mongoose';

export type IUser = {
  name: string;
  password: string;
  email: string;
  role: 'user' | 'admin';
  address: string;
};

export type UserModel = {
  isUserExist(phoneNumber: string): Promise<Partial<IUser | null>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
