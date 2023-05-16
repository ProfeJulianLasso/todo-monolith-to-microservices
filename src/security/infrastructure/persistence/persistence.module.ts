import { Module } from '@nestjs/common';
import { PostgresModule } from './databases/postgres';
import {
  RoleRepository,
  SessionRepository,
  UserRepository,
} from './repositories';

@Module({
  imports: [PostgresModule],
  controllers: [],
  providers: [UserRepository, RoleRepository, SessionRepository],
  exports: [UserRepository, RoleRepository, SessionRepository],
})
export class PersistenceModule {}
