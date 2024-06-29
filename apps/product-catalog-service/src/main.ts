/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { runMigration, ServiceEnum } from '@ecommerce/libs';
import { dataSource } from './app/product-catalog/infrastructure/database/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  // run migrations
  await runMigration(dataSource);
  Logger.log(
    `🚀 ${ServiceEnum.ProductCatalogService} Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
