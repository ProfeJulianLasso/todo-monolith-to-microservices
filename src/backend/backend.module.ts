import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { SecurityModule } from './security/security.module';
import { gRPCSecurityClientConfig } from './shared/config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    // ConfigModule.forRoot({ load: [Configuration], isGlobal: true }),
    ClientsModule.register([gRPCSecurityClientConfig]),
    SecurityModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class BackendModule {}
