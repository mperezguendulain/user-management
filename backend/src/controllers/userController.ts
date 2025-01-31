import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Services
import {
  getUsersService,
  updateUserService,
  deleteUserService,
  addUserService,
  getUserService
} from "../services/userService";

// Utils
import { getError } from "../utils/errorUtil";

// Validators
import {
  AddUserSchema,
  GetUsersSchema,
  UpdateUserSchema
} from "../utils/validators/userValidator";

// Types
import type {
  User,
  UserAddFormData,
  UserPropsToUpdate,
  UserRole,
  UserStatus
} from "../types/UserType";

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page, limit, role, status, search } = req.query;

    const validatedData = GetUsersSchema.parse({
      page,
      limit,
      role,
      status,
      search
    });

    const offset = (Number(page) - 1) * Number(limit);

    const users = await getUsersService(
      validatedData.limit,
      offset,
      validatedData.role as UserRole,
      validatedData.status as UserStatus,
      validatedData.search
    );
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(400).json(getError(err));
  }
};

export const getAuthenticatedUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "") as string;

    const { id } = jwt.decode(token) as { id: string };

    const user = await getUserService(id);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json(getError(err));
  }
};

export const addUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUserData: UserAddFormData = req.body;

    const validatedUserData = AddUserSchema.parse(newUserData);

    const addedUser: User = await addUserService(validatedUserData);
    res.json({ success: true, data: addedUser });
  } catch (err) {
    res.status(400).json(getError(err));
  }
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user: UserPropsToUpdate = req.body;

    const validatedData = UpdateUserSchema.parse(user);

    if (Object.keys(validatedData).length === 0) {
      throw new Error("Please update at least one property");
    }

    const updatedUser = await updateUserService(String(id), validatedData);
    res.json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(400).json(getError(err));
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserService(String(id));
    res.status(200).send({ success: true, data: deletedUser });
  } catch (err) {
    res.status(400).json(getError(err));
  }
};
