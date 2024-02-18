import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),

    email: z.string({
      required_error: 'Name is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    role: z.string({
      required_error: 'Role is required',
    }),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
  loginZodSchema,
};
