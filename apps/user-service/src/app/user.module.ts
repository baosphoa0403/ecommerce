import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpHandler } from 'apps/user-service/src/app/user/application/commands';
import { UserEntity } from 'apps/user-service/src/app/user/domain/user/entities/user.entity';
import { UserRepository } from 'apps/user-service/src/app/user/infrastructure';
import { UserSignUpEventController } from 'apps/user-service/src/app/user/presentation';

console.log('UserSignUpEventController', UserSignUpEventController);

const commandHandler = [SignUpHandler];

const eventHandler = [];

const eventController = [UserSignUpEventController];

const httpController = [];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  controllers: [...eventController, ...httpController],
  providers: [UserRepository, ...commandHandler, ...eventHandler],
  exports: [UserRepository],
})
export class UserModule {}
