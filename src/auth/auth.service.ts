import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDataDto } from './dto/login-data.dto';
import { Payload } from './jwt/payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(loginData: LoginDataDto) {
    if (loginData.email === 'test@test.com' && loginData.password === 'test') {
      const payload: Payload = { email: loginData.email, sub: '0' };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('인증되지 않은 사용자');
    }
  }
}
