import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
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
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
};
