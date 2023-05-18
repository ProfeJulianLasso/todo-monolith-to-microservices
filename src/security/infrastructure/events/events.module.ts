import { Module } from '@nestjs/common';
import { SignedInPublisher, SignedUpPublisher } from './publishers';

@Module({
  imports: [],
  controllers: [],
  providers: [SignedInPublisher, SignedUpPublisher],
  exports: [SignedInPublisher, SignedUpPublisher],
})
export class EventsModule {}
