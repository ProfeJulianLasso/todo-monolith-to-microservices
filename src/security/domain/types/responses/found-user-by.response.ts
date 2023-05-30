import { UserType } from '../../types/entities';

export type FoundUserByResponse = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  data: UserType[];
};
