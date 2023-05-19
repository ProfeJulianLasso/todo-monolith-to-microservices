import { Module } from '@nestjs/common';
import { SignedUpSubscribers } from './subscribers';

@Module({
  imports: [],
  controllers: [SignedUpSubscribers],
  providers: [],
  exports: [],
})
export class EventsModule {}
