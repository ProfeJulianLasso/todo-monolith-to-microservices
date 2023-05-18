import { Module } from '@nestjs/common';
import { BackendModule } from './backend/backend.module';
import { SecurityModule } from './security/infrastructure/security.module';

@Module({
  imports: [BackendModule, SecurityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
