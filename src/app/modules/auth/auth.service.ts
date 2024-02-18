import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../Helper/jwtHelper';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const body = payload;
  const user = await User.create(body);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
  return user;
};
const loginUser = async (
  payload: ILoginUser,
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist?.password &&
    !User.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
  }

  const { email: userEmail } = isUserExist;

  const token = jwtHelpers.createToken(
    { email: userEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    token,
  };
};

export const AuthService = {
  createUser,
  loginUser,
};
