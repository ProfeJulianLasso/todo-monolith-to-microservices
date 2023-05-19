import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SignedInPublisher, SignedUpPublisher } from './publishers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SECURITY_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'security',
            brokers: ['localhost:9091'],
          },
          // consumer: {
          //   groupId: 'security-consumer',
          // },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [SignedInPublisher, SignedUpPublisher],
  exports: [SignedInPublisher, SignedUpPublisher],
})
export class EventsModule {}
