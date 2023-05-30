import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ValueObjectFilter } from './common';
import { SecurityModule } from './security/infrastructure/security.module';

@Module({
  imports: [SecurityModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ValueObjectFilter,
    },
  ],
})
export class AppModule {}
