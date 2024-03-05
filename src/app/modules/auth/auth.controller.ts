import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import config from '../../../config';
import { ILoginResponse } from './auth.interface';
import { AuthService } from './auth.service';

const createUser = async (req: Request, res: Response) => {
  const body = req.body;
  const result = await AuthService.createUser(body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
};

const loginUser = catchAsync(async (req, res) => {
  const loginData = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  //set refresh token in cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: others,
  });
});

export const AuthController = {
  createUser,
  loginUser,
};
