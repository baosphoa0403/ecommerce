import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getOptionsByService } from '@ecommerce/libs';
import { ServiceEnum } from '@ecommerce/libs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ServiceEnum.AUTH_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: getOptionsByService[ServiceEnum.AUTH_SERVICE].clientId,
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: getOptionsByService[ServiceEnum.AUTH_SERVICE].groupId,
          },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
