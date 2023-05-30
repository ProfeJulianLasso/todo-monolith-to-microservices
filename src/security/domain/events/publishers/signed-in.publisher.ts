import { SignedInResponse } from '../../types';

export interface ISignedInPublisher {
  publish(data: SignedInResponse): void;
}
