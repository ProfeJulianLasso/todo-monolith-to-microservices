import { UserType } from '../../types/entities';

export type CreatedOrUpdatedUserResponse = {
  message: string;
  data: Partial<UserType>;
};
