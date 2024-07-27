/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ServiceEnum, getOptionsByService } from '@ecommerce/libs';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const kafkaMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: getOptionsByService[ServiceEnum.AUTH_SERVICE].clientId, // console.log -> auth-server
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: getOptionsByService[ServiceEnum.AUTH_SERVICE].groupId, // -> auth-consumer-server
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  });
  const port = 3001;
  const globalPrefix = 'api';
  await app.startAllMicroservices();

  // using http
  await app.listen(port);
  Logger.log(
    `🚀 ${ServiceEnum.AUTH_SERVICE} is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
