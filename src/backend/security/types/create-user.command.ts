export type CreateUserCommand = {
  userId: string;
  name: string;
  email: string;
  password: string;
  status?: boolean;
  roleId?: string;
};
