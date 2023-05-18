import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { gRPCMicroservices } from './backend/shared/config';
import { RpcExceptionFilter } from './backend/shared/exception-filters';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(gRPCMicroservices);
  app.useGlobalFilters(new RpcExceptionFilter());
  await app.startAllMicroservices();
  console.log(`🚀 Microservice is running on: http://[::1]:3001`);
  await app.listen(3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
};

bootstrap();
