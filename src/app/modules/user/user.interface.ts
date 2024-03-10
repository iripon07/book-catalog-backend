import { Model } from 'mongoose';

export type IUser = {
  name: string;
  password: string;
  email: string;
  address: string;
};

export type UserModel = {
  isUserExist(id: string): Promise<Pick<IUser, 'password' | 'email'>>;
  isPasswordMatched(
    givenPassword: string,
    savePassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
