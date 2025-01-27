export const findUserByEmail = `
  SELECT * FROM users
  WHERE email = $1;
`;

export const insertUser = `
  INSERT INTO users (firstName, lastName, email, phoneNumber, role, status, address, profilePictureURL)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
`;