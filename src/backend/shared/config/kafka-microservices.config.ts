import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const KafkaMicroservices: MicroserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9091'],
    },
    // consumer: {
    //   groupId: 'consumer-monolith',
    // },
  },
};
