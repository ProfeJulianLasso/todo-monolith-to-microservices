import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';

export const gRPCSecurityClientConfig: ClientProviderOptions = {
  name: 'SECURITY',
  transport: Transport.GRPC,
  options: {
    package: 'com.sofka.ToDo.security',
    protoPath: [join(process.cwd(), 'proto', 'security.proto')],
    url: 'localhost:3001',
  },
};
