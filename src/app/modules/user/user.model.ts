/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { userRole } from './user.constant';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: userRole,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// create static method
userSchema.statics.isUserExist = async function (
  email: string,
): Promise<Pick<IUser, 'email' | '_id' | 'password' | 'role'> | null> {
  return await User.findOne(
    { email: email },
    {
      email: 1,
      _id: 1,
      password: 1,
      role: 1,
    },
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

//hashing password
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
