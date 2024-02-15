import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const body = payload;
  const user = await User.create(body);
  if (!user) {
    throw new Error('Failed to create user');
  }
  return user;
};

export const AuthServices = {
  createUser,
};
