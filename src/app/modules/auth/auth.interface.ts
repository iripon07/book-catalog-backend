import { IUser } from '../user/user.interface';

export type ILogin = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  user: Partial<IUser | null>;
  refreshToken?: string | null;
};
