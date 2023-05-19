import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatedOrUpdatedUserResponse } from '../../types';

@Controller()
export class SignedUpSubscribers {
  @MessagePattern('security.signed-up')
  handle(@Payload() data: CreatedOrUpdatedUserResponse): void {
    console.log(`👂 Evento "SignedUpSubscribers" ${data.message}`, data.data);
  }
}
