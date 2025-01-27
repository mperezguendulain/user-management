import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Please add a valid email').nonempty('Email is a required field'),
  password: z.string().nonempty('Password is a required field')
});