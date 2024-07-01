import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { IEnvironment } from '@ecommerce/libs';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object<IEnvironment>({
        APP_NAME: Joi.string().required(),
        APP_PORT: Joi.number().port().required()
      }),
      envFilePath: "../../.env"
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
