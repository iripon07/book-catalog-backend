'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthValidation = void 0;
const zod_1 = require('zod');
const createUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string({
      required_error: 'Name is required',
    }),
    email: zod_1.z.string({
      required_error: 'Name is required',
    }),
    password: zod_1.z.string({
      required_error: 'Password is required',
    }),
    address: zod_1.z.string({
      required_error: 'Address is required',
    }),
  }),
});
const loginZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    email: zod_1.z.string({
      required_error: 'Email is required',
    }),
    password: zod_1.z.string({
      required_error: 'Password is required',
    }),
  }),
});
exports.AuthValidation = {
  createUserZodSchema,
  loginZodSchema,
};
