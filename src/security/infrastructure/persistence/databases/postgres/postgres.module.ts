// Libraries
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Config TypeORM
import { TypeOrmConfigService } from './configs';
import {
  RolePostgresEntity,
  SessionPostgresEntity,
  UserPostgresEntity,
} from './entities';
import {
  RolePostgresRepository,
  SessionPostgresRepository,
  UserPostgresRepository,
} from './repositories';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([
      UserPostgresEntity,
      RolePostgresEntity,
      SessionPostgresEntity,
    ]),
  ],
  controllers: [],
  providers: [
    UserPostgresRepository,
    RolePostgresRepository,
    SessionPostgresRepository,
  ],
  exports: [
    TypeOrmModule,
    UserPostgresRepository,
    RolePostgresRepository,
    SessionPostgresRepository,
  ],
})
export class PostgresModule {}
