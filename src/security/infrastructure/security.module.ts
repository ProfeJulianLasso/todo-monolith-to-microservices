import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from './config';
import { LoginAPI, RegisterAPI } from './controllers';
import { PersistenceModule } from './persistence';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [Configuration], isGlobal: true }),
    PersistenceModule,
  ],
  controllers: [LoginAPI, RegisterAPI],
  providers: [],
})
export class SecurityModule {}
