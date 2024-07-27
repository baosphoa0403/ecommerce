import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpUserCommand } from '../impls';
import { UserRepository } from '../../../infrastructure';
import { UserEntity } from 'apps/user-service/src/app/user/domain/user/entities/user.entity';

@CommandHandler(SignUpUserCommand)
export class SignUpHandler implements ICommandHandler<SignUpUserCommand> {
  constructor(private userRepository: UserRepository) {}
  async execute(command: SignUpUserCommand): Promise<UserEntity> {
    const { userDto } = command;
    const data = await this.userRepository.create(userDto);
    return data;
  }
}
