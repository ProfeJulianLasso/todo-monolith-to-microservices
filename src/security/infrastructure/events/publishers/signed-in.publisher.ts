import { SignedInResponse } from 'src/security/core/domain/types';
import { ISignedInPublisher } from '../../../core/domain/events/publishers';

export class SignedInPublisher implements ISignedInPublisher {
  publish(data: SignedInResponse): void {
    console.log(`🗣️ Emitir evento "SignedInPublisher" ${JSON.stringify(data)}`);
  }
}
