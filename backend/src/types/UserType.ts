export type UserRole = 'user' | 'admin';

export type UserStatus = 'active' | 'inactive';

type UserAddress = {
  street: string,
  number: string,
  city: string,
  postalCode: number
}

export type UserPropsToUpdate = {
  firstName?: string,
  lastName?: string,
  email?: string,
  phoneNumber?: string,
  role?: UserRole,
  status?: UserStatus,
  address?: UserAddress,
  profilePictureURL?: string
}

export type UserDefault = {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber?: string,
  role: UserRole,
  status: UserStatus,
  address?: UserAddress,
  profilePictureURL?: string
}

export type UserAddFormData = UserDefault & { password: string }

export type User = UserDefault & { id: string }

export type UserComplete = UserDefault & { id: string, password: string }
