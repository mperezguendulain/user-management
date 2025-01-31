import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { pool } from "../config/db";

// SQL Queries
import { GET_USER_BY_EMAIL } from "../queries/userQueries";

// Types
import type { User, UserComplete } from "../types/UserType";

const generateToken = (user: User): string => {
  const secretKey = process.env.JWT_SECRET as string;
  return jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
};

export const loginService = async (
  email: string,
  password: string
): Promise<string> => {
  const { rows } = await pool.query<UserComplete>(GET_USER_BY_EMAIL, [email]);
  const user = rows[0];

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isTheSamePassword = await bcrypt.compare(password, user?.password);
  if (!isTheSamePassword) {
    throw new Error("Invalid credentials");
  }

  return generateToken(user);
};
