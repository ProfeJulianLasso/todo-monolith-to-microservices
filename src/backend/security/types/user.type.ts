import { RoleType } from './role.type';

export type UserType = {
  userId: string;
  name: string;
  email: string;
  password: string;
  status: boolean;
  role: RoleType;
};
