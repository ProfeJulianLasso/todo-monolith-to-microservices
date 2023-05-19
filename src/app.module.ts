import { Module } from '@nestjs/common';
import { BackendModule } from './backend/backend.module';
import { SecurityModule } from './security/infrastructure/security.module';
import { TodoModule } from './todo/infrastructure/todo.module';

@Module({
  imports: [BackendModule, SecurityModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
