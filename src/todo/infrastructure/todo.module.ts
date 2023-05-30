import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration.config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class TodoModule {}
