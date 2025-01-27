import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { pool } from '../config/db';

// SQL Queries
import { GET_USER_BY_EMAIL } from '../queries/userQueries';

// Types
import { User, UserComplete } from '../types/UserType';

const generateToken = (user: User): string => {
  const secretKey = process.env.JWT_SECRET!;
  return jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
};

export const loginService = async (email: string, password: string): Promise<string> => {
  const { rows } = await pool.query<UserComplete>(GET_USER_BY_EMAIL, [email]);
  const user = rows[0];

  const isTheSamePassword = await bcrypt.compare(password, user.password);
  if (!isTheSamePassword) {
    throw new Error('Invalid credentials');
  }

  return generateToken(user);
};
