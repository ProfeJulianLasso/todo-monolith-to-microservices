import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { Configuration } from './config';
import { SecurityController } from './controllers';
import { EventsModule } from './events';
import { ValueObjectExceptionFilter } from './exception-filters/value-object.exception-filter';
import { PersistenceModule } from './persistence';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [Configuration], isGlobal: true }),
    EventsModule,
    PersistenceModule,
  ],
  controllers: [SecurityController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ValueObjectExceptionFilter,
    },
  ],
})
export class SecurityModule {}
