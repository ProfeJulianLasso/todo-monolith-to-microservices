import { CreatedOrUpdatedUserResponse } from '../../types';

export interface ISignedUpPublisher {
  publish(data: CreatedOrUpdatedUserResponse): void;
}
