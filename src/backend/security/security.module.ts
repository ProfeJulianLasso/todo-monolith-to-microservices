import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { gRPCSecurityClientConfig } from '../shared/config';
import { LoginController, RegisterController } from './controllers';
import { SecurityService } from './services';

@Module({
  imports: [ClientsModule.register([gRPCSecurityClientConfig])],
  controllers: [LoginController, RegisterController],
  providers: [SecurityService],
})
export class SecurityModule {}
