import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from './configs';
import { LoginAPI, RegisterAPI } from './api';
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
