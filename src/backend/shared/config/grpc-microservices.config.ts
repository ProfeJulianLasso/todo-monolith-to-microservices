import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';

export const gRPCMicroservices: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['com.sofka.ToDo.security'],
    protoPath: [join(process.cwd(), 'proto', 'security.proto')],
    url: 'localhost:3001',
  },
};
