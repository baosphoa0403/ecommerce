import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { IEnvironment, ObservableModule } from '@ecommerce/libs';
import { AuthModule } from './auth/auth.module';

const ShareModule = [
  ConfigModule.forRoot({
    validationSchema: Joi.object<IEnvironment>({
      APP_NAME: Joi.string().required(),
      APP_PORT: Joi.number().port().required(),
    }),
    envFilePath: '../../.env',
  }),
  ObservableModule,
];

@Module({
  imports: [...ShareModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private moduleRef: ModuleRef) {
  //   // Check if the AppService is initialized
  //   const appService = this.moduleRef.get('AUTH_SERVICE', { strict: false });
  //   console.log('appService1', appService);
  //   if (appService) {
  //     console.log('AUTH_SERVICE is initialized');
  //   } else {
  //     console.log('AUTH_SERVICE is not initialized');
  //   }
  // }
}
