import { Body, Controller, Post } from '@nestjs/common';
import { UserDataDto } from './dto/user-data.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid email or password',
  })
  @ApiBody({ type: UserDataDto })
  @Post('login')
  login(@Body() loginData: UserDataDto) {
    return this.authService.login(loginData);
  }
}
