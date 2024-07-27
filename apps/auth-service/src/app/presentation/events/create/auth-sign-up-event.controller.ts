import {
  AuthEvent,
  CreateUserRequestDto,
  ObservableService,
  ServiceEnum,
  SignUpError,
  UserEvent,
  generateHash,
} from '@ecommerce/libs';
import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthSignUpEventController implements OnModuleInit {
  constructor(
    @Inject(ServiceEnum.USER_SERVICE)
    private clientUser: ClientKafka,
    private observableService: ObservableService
  ) {}

  async onModuleInit() {
    this.clientUser.subscribeToResponseOf(UserEvent.CreateUser);
    await this.clientUser.connect();
  }

  @MessagePattern(AuthEvent.CreateUser)
  async handleMessagePattern(createUserDto: CreateUserRequestDto) {
    // business logic

    const generatePassword = generateHash(createUserDto.password);

    // emit kafka

    const data = this.observableService.pipeOrError(
      this.clientUser.send<CreateUserRequestDto>(
        UserEvent.CreateUser,
        JSON.stringify({ ...createUserDto, password: generatePassword })
      ),
      5000,
      SignUpError.CREATE_USER_ERROR
    );

    const res = await this.observableService.firstValueFromObservable(data);

    return res;
  }
}
