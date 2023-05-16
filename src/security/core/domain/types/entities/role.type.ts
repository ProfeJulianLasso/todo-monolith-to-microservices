import { UserType } from './user.type';

export type RoleType = {
  roleId: string;
  name: string;
  description?: string;
  status: boolean;
  users?: UserType[];
};
