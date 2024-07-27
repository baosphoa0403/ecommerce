import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ObservableModule,
  ServiceEnum,
  getOptionsByService,
  kafkaConsumerModule,
} from '@ecommerce/libs';
import { AuthSignUpEventController } from 'apps/auth-service/src/app/presentation';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

const eventController = [AuthSignUpEventController];

@Module({
  imports: [
    kafkaConsumerModule,
    ClientsModule.register([
      {
        name: ServiceEnum.USER_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: getOptionsByService[ServiceEnum.USER_SERVICE].clientId,
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: getOptionsByService[ServiceEnum.USER_SERVICE].groupId,
          },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
    ObservableModule,
  ],
  controllers: [AppController, ...eventController],
  providers: [AppService],
})
export class AppModule {}
