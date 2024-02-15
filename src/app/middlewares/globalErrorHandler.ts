import { Request, NextFunction, Response } from 'express';

const globalErrorHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};

export default globalErrorHandler;
