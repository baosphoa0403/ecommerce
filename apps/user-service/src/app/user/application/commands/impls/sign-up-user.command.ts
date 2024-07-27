import {ICommand} from "@nestjs/cqrs";
import {CreateUserRequestDto} from "@ecommerce/libs";

export class SignUpUserCommand implements ICommand {
  constructor(
    public readonly userDto: CreateUserRequestDto
  ) {}
}
