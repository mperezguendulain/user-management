import { number, z } from 'zod';

const UserRoleOptions = ['user', 'admin'] as const;
const UserStatusOptions = ['active', 'inactive'] as const;

export const GetUsersSchema = z.object({
  page: z.preprocess(
    (val) => {
      if (val === undefined) {
        return undefined;
      }
      return Number(val);
    },
    z.number().min(1)
  ),
  limit: z.preprocess(
    (val) => {
      if (val === undefined) {
        return undefined;
      }
      return Number(val);
    },
    z.number().min(1)
  ),
  role: z.enum(UserRoleOptions).optional(),
  status: z.enum(UserStatusOptions).optional(),
  search: z.string().optional()
});

export const AddUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  password: z.string(),
  role: z.enum(UserRoleOptions),
  status: z.enum(UserStatusOptions),
  address: z.object({
    street: z.string(),
    number: z.string(),
    city: z.string(),
    postalCode: z.number()
  }).optional(),
  profilePictureURL: z.string().optional()
});

export const UpdateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  role: z.enum(UserRoleOptions).optional(),
  status: z.enum(UserStatusOptions).optional(),
  address: z.object({
    street: z.string(),
    number: z.string(),
    city: z.string(),
    postalCode: z.number()
  }).optional(),
  profilePictureURL: z.string().optional()
});