import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { gRPCMicroservices } from './backend/shared/config';
import { RpcExceptionFilter } from './backend/shared/exception-filters';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(gRPCMicroservices);
  // app.connectMicroservice<MicroserviceOptions>(KafkaMicroservices);
  await app.startAllMicroservices();
  console.log(`🚀 Microservice gRPC is running on: http://[::1]:3001`);
  console.log(`🚀 Connected to Kafka on: http://[::1]:9091`);
  app.useGlobalFilters(new RpcExceptionFilter());
  await app.listen(3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
};

bootstrap();
