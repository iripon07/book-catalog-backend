import { Request, Response } from 'express';
import { AuthServices } from './auth.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await AuthServices.createUser(body);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed',
    });
  }
};
export const AuthController = {
  createUser,
};
