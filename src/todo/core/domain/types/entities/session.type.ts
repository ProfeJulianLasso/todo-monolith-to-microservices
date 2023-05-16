import { UserType } from './user.type';

export type SessionType = {
  token: string;
  user: UserType;
  createdAt: Date;
  expiresAt?: Date;
};
