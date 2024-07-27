import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserRequestDto } from '@ecommerce/libs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  createUser(@Body() createUserDto: CreateUserRequestDto) {
    return this.authService.createUser(createUserDto);
  }

  @Get('/me')
  getMe() {
    // return this.authService.sendTestMessagePattern();
  }
}
