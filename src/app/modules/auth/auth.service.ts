import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../Helper/jwtHelper';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const createUser = async (
  payload: IUser,
): Promise<{ result: IUser | null; token: string }> => {
  const user = payload;
  const isEmailUsed = await User.findOne({ email: user?.email });
  if (!isEmailUsed) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already used');
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
  const result = await User.findById(createdUser._id);

  const token = jwtHelpers.createToken(
    { email: result?.email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  return { result, token };
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
