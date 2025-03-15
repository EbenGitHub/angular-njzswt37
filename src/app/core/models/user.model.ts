/**
 * user type (admin, user)
 */
export enum UserType {
  USER = 'user',
  ADMIN = 'admin',
}

/**
 * user interface
 */
export interface IUser {
  username: string;
  email: string;
  type: UserType;
  password: string;
}
