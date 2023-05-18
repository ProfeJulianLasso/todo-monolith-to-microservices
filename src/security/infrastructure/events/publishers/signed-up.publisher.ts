import { Injectable } from '@nestjs/common';
import { ISignedUpPublisher } from '../../../core/domain/events/publishers';
import { CreatedOrUpdatedUserResponse } from '../../../core/domain/types';

@Injectable()
export class SignedUpPublisher implements ISignedUpPublisher {
  publish(data: CreatedOrUpdatedUserResponse): void {
    console.log(`🗣️ Emitir evento "SignedUpPublisher" ${JSON.stringify(data)}`);
  }
}
