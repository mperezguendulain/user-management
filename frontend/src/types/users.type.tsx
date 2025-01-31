export type UserRole = "admin" | "user";

export type UserStatus = "active" | "inactive";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  status: UserStatus;
  address?: {
    street: string;
    number: string;
    city: string;
    postalCode: number;
  };
  profilePicture?: string;
};
