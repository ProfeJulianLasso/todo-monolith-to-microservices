import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { gRPCSecurityClientConfig } from '../shared/config';
import { SecurityController } from './controllers';
import { SecurityService } from './services';

@Module({
  imports: [ClientsModule.register([gRPCSecurityClientConfig])],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
