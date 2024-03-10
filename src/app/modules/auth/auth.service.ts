import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../Helper/jwtHelper';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILogin, ILoginResponse } from './auth.interface';

const createUser = async (
  user: IUser,
): Promise<{ result: IUser | null; token: string }> => {
  const isEmailExist = await User.findOne({ email: user.email });
  if (isEmailExist) {
    throw new ApiError(httpStatus.CONFLICT, 'This email is already exist');
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, `User not created`);
  }
  const result = await User.findById(createdUser._id);
  const token = jwtHelpers.createToken(
    { email: result?.email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  return { result, token };
};

const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password not match');
  }

  const { email: userEmail } = isUserExist;

  // create access token
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
