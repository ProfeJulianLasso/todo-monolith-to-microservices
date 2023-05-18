import { UserType } from './user.type';

export type CreatedOrUpdatedUserResponse = {
  message: string;
  data: UserType;
};
