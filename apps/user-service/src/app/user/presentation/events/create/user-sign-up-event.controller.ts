import { CreateUserRequestDto, UserEvent } from '@ecommerce/libs';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { SignUpUserCommand } from 'apps/user-service/src/app/user/application/commands';

@Controller()
export class UserSignUpEventController {
  constructor(private commandBus: CommandBus) {}

  @MessagePattern(UserEvent.CreateUser)
  async handleMessagePattern(data: CreateUserRequestDto) {
    // business logic

    const res = await this.commandBus.execute(new SignUpUserCommand(data));
    return JSON.stringify(res);
  }
}
