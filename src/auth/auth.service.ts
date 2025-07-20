import { JwtService } from '@nestjs/jwt';
import { UserDataDto } from './dto/user-data.dto';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login({ email, password }: UserDataDto) {
    try {
      const user = await this.usersService.readByEmail(email);

      // 평문 비밀번호와 해시된 비밀번호 비교
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(
          '이메일 또는 비밀번호가 올바르지 않습니다',
        );
      }

      return {
        accessToken: this.jwtService.sign(user),
      };
    } catch (error) {
      // 사용자가 존재하지 않으면 NotFoundException을 뱉는게 맞지만,
      // 그러면 보안 상 이유로 어떤 이메일이 가입되었는지 알 수 있으므로 UnauthorizedException으로 감싸서 던진다.
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException(
          '이메일 또는 비밀번호가 올바르지 않습니다',
        );
      }

      throw error;
    }
  }
}
