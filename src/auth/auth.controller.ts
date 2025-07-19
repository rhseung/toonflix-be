import { Body, Controller, Post } from '@nestjs/common';
import { LoginDataDto } from './dto/login-data.dto';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDataDto })
  @Post('login')
  login(@Body() loginData: LoginDataDto) {
    return this.authService.login(loginData);
  }
}
