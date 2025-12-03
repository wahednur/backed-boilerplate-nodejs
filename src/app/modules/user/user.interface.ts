import { UserRole } from "@prisma/enums";
export enum IAuthProvider {}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  phone?: string;
  photo?: string;
}

export interface IUserCreate {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
