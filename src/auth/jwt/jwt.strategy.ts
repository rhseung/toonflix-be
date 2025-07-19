import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        const secret = process.env?.JWT_SECRET;

        if (!secret) {
          done(new Error('JWT_SECRET environment variable is not set'));
        } else {
          done(null, secret);
        }
      },
    });
  }

  validate(payload: Payload) {
    const user = payload.sub === '0';

    if (user) return user;
    else throw new UnauthorizedException('접근 오류');
  }
}
