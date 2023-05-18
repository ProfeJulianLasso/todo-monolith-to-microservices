import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from './config';
import { SecurityController } from './controllers';
import { EventsModule } from './events';
import { PersistenceModule } from './persistence';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [Configuration], isGlobal: true }),
    EventsModule,
    PersistenceModule,
  ],
  controllers: [SecurityController],
  providers: [],
})
export class SecurityModule {}
