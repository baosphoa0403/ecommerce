import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './user/infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { IEnvironment } from '@ecommerce/libs';
import { UserModule } from 'apps/user-service/src/app/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object<IEnvironment>({
        APP_NAME: Joi.string().required(),
        APP_PORT: Joi.number().port().required(),
        ENABLE_MIGRATE: Joi.boolean().required(),
      }),
      envFilePath: '../../.env',
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
