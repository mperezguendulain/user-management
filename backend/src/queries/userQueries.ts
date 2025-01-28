export const GET_USERS = `
  SELECT "id", "firstName", "lastName", "email", "phoneNumber", "role", "status", "address", "profilePictureURL"
  FROM users
  WHERE
    ($3::user_role IS NULL OR "role" = $3)
    AND ($4::user_status IS NULL OR "status" = $4)
    AND ($5::text IS NULL OR "firstName" ILIKE '%' || $5 || '%' OR "lastName" ILIKE '%' || $5 || '%' OR "email" ILIKE '%' || $5 || '%')
  ORDER BY "firstName", "lastName" ASC, "email" ASC
  LIMIT $1 OFFSET $2;
`;

export const GET_USER_BY_EMAIL = `
  SELECT "id", "firstName", "lastName", "email", password, "phoneNumber", "role", "status", "address", "profilePictureURL" FROM users
  WHERE "email" = $1;
`;

export const ADD_USER = `
  INSERT INTO users ("firstName", "lastName", "email", password, "phoneNumber", "role", "status", "address", "profilePictureURL")
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING "id", "firstName", "lastName", "email", "phoneNumber", "role", "status", "address", "profilePictureURL";
`;

export const getUpdateUserSQL = (columnsToUpdate: string[]) => {
  const queryStart = 'UPDATE users SET '
  const queryEnd = 'WHERE "id" = $1 RETURNING "id", "firstName", "lastName", "email", "phoneNumber", "role", "status", "address", "profilePictureURL";'

  const queryMiddle = columnsToUpdate.map((columnName, index) => `"${columnName}" = $${index + 2}`)

  const sqlStatement = `${queryStart}${queryMiddle.join(', ')} ${queryEnd}`;
  return sqlStatement;
};

export const deleteUser = `
  DELETE FROM users
  WHERE "id" = $1
  RETURNING "id", "firstName", "lastName", "email", "phoneNumber", "role", "status", "address", "profilePictureURL";
`;