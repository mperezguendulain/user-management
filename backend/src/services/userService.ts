import bcrypt from 'bcrypt';

import { pool } from '../config/db';
import { GET_USERS, getUpdateUserSQL, deleteUser, ADD_USER } from '../queries/userQueries';

// Types
import { User, UserAddFormData, UserDefault, UserPropsToUpdate, UserRole, UserStatus } from '../types/UserType';

export const getUsersService = async (limit: number, offset: number, role?: UserRole, status?: UserStatus, searchTerm?: string): Promise<User[]> => {
  const { rows } = await pool.query<User>(
    GET_USERS,
    [limit, offset, role, status, searchTerm]
  );
  return rows;
};

export const addUserService = async (newUser: UserAddFormData): Promise<User> => {

  const passwordHashed = await bcrypt.hash(newUser.password, 10);

  const { rows } = await pool.query<User>(
    ADD_USER,
    [newUser.firstName, newUser.lastName, newUser.email, passwordHashed, newUser.phoneNumber, newUser.role, newUser.status, newUser.address, newUser.profilePictureURL]
  );
  return rows[0];
};

export const updateUserService = async (
  id: string,
  user: UserPropsToUpdate
): Promise<User> => {
  console.log('>> user props to update:', user);
  const entriesToUpdate = Object.entries(user).filter(([ key, value ]) => !!value);
  const columnsToUpdate = entriesToUpdate.map(([key]) => key);
  const valuesToUpdate = entriesToUpdate.map(([_key, value]) => value);
  const { rows } = await pool.query<User>(getUpdateUserSQL(columnsToUpdate), [id, ...valuesToUpdate]);
  return rows[0];
};

export const deleteUserService = async (id: string): Promise<User> => {
  const { rows } = await pool.query<User>(deleteUser, [id]);
  return rows[0];
};