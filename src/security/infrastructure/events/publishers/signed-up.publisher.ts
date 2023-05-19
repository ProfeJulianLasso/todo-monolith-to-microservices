import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ISignedUpPublisher } from '../../../core/domain/events/publishers';
import { CreatedOrUpdatedUserResponse } from '../../../core/domain/types';

@Injectable()
export class SignedUpPublisher implements ISignedUpPublisher {
  constructor(@Inject('SECURITY_SERVICE') private client: ClientProxy) {}

  publish(data: CreatedOrUpdatedUserResponse): void {
    this.client.emit('security.signed-up', data);
    console.log('🗣️ Emitir evento "SignedUpPublisher"', data);
  }
}
