import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './product-catalog/infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { IEnvironment } from '@ecommerce/libs';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object<IEnvironment>({
        APP_NAME: Joi.string().required(),
        APP_PORT: Joi.number().port().required(),
        ENABLE_MIGRATE: Joi.boolean().required()
      }),
      envFilePath: "../../.env"
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
