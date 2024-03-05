import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../Helper/jwtHelper';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILogin, ILoginResponse } from './auth.interface';

const createUser = async (user: IUser): Promise<Partial<IUser | null>> => {
  if (user) {
    user.role = 'user';
  }
  const result = await User.create(user);
  if (result) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...dataWithoutPassword } = result.toJSON();
    return dataWithoutPassword;
  }
  return null;
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
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password not match');
  }

  const user = await User.findOne({ email: email });

  // create access token
  const accessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in },
  );

  // create refresh token
  const refreshToken = jwtHelpers.createToken(
    { _id: isUserExist._id, role: isUserExist.role },
    config.jwt.refresh_secret as Secret,
    {
      expiresIn: config.jwt.refresh_expires_in,
    },
  );

  return {
    accessToken,
    user: user,
    refreshToken,
  };
};

// const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
//   const { email, password } = payload;
//   const isUserExist = await User.isUserExist(email);
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }

//   if (isUserExist?.password && !(await !User.isPasswordMatched(password, isUserExist?.password))) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
//   }

//   const user = await User.findOne({ email: email });

//   //create access token
//   const accessToken = jwtHelpers.createToken(
//     {
//       _id: isUserExist._id,
//       role: isUserExist.role,
//     },
//     config.jwt.secret as Secret,
//     { expiresIn: config.jwt.expires_in },
//   );

//   // create refresh token
//   const refreshToken = jwtHelpers.createToken(
//     { _id: isUserExist._id, role: isUserExist.role },
//     config.jwt.refresh_secret as Secret,
//     {
//       expiresIn: config.jwt.refresh_expires_in,
//     },
//   );
//   return {
//     accessToken,
//     user,
//     refreshToken
//   };
// };

export const AuthService = {
  createUser,
  loginUser,
};
