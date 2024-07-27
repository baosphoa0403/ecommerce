import {
  AuthEvent,
  CreateUserRequestDto,
  ObservableService,
  ServiceEnum,
  SignUpError,
} from '@ecommerce/libs';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject(ServiceEnum.AUTH_SERVICE)
    private clientAuth: ClientKafka,
    private observableService: ObservableService
  ) {}

  async onModuleInit() {
    this.clientAuth.subscribeToResponseOf(AuthEvent.CreateUser);
    await this.clientAuth.connect();
  }

  async createUser(createUserDto: CreateUserRequestDto) {
    const data = this.observableService.pipeOrError(
      this.clientAuth.send<CreateUserRequestDto>(
        AuthEvent.CreateUser,
        JSON.stringify(createUserDto)
      ),
      5000,
      SignUpError.CREATE_USER_ERROR
    );

    return await this.observableService.firstValueFromObservable(data);
  }
}
