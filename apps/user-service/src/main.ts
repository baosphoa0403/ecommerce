/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { getOptionsByService, runInit, ServiceEnum } from '@ecommerce/libs';
import { ConfigService } from '@nestjs/config';
import { dataSource } from 'apps/user-service/src/app/user/infrastructure/database/database';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const kafkaMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: getOptionsByService[ServiceEnum.USER_SERVICE].clientId, // console.log -> auth-server
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: getOptionsByService[ServiceEnum.USER_SERVICE].groupId, // -> auth-consumer-server
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  });

  await app.startAllMicroservices();

  const configService = app.get(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = configService.get('APP_PORT');
  await app.listen(port);
  await runInit(dataSource);
  Logger.log(
    `🚀${ServiceEnum.USER_SERVICE} Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
