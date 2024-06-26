/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ServiceEnum } from '@ecommerce/libs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService =  app.get(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = configService.get("APP_PORT");
  await app.listen(port);
  Logger.log(
    `🚀 ${ServiceEnum.ApiGateWay} is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap()
